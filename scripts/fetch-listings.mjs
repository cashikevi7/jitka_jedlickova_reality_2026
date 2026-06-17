/**
 * Stáhne nabídky z Reality Proradost: HTML → parsování → obrázky do public, data do data/listings.json.
 * Zachová z předchozího listings.json: coordinates, rooms, size, category, virtualTour (stejný slug).
 * Vždy doplní sourceUrl z listings-source.json.
 *
 * Pozn.: HTML detail může vracet Anubis — pak spusť z jiné sítě/VPN nebo doplni data ručně.
 * U obrázků posíláme Referer na URL detailu; bez něj CDN často vrátí HTML místo JPEG.
 *
 * Spuštění: npm run fetch-listings
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const PUBLIC_PROPERTIES = path.join(ROOT, "public", "images", "properties");

const SOURCE_PATH = path.join(DATA_DIR, "listings-source.json");
const OUT_PATH = path.join(DATA_DIR, "listings.json");

const CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Přepis souboru na Windows občas selže, pokud je starý soubor read-only nebo zamčený. */
function safeWriteImageFile(filepath, buf) {
  try {
    if (fs.existsSync(filepath)) {
      try {
        fs.chmodSync(filepath, 0o666);
      } catch {
        // ignore
      }
      fs.unlinkSync(filepath);
    }
  } catch {
    // ignore — zkusíme přepsat writeFile
  }
  fs.writeFileSync(filepath, buf);
}

function absoluteUrl(base, href) {
  if (!href || href.startsWith("data:")) return null;
  if (href.startsWith("http")) return href;
  const u = new URL(href, base);
  return u.href;
}

/** Detekce Anubis / jiné bot-brány místo reálného HTML detailu. */
function isBotWall(html) {
  return (
    /Making sure you['']re not a bot/i.test(html) ||
    /within\.website\/x\/cmd\/anubis/i.test(html) ||
    (html.length < 8000 && /<title>[^<]*bot[^<]*<\/title>/i.test(html))
  );
}

/** Obrázek z reality-proradost.cz bez Referer často vrátí Anubis HTML místo binárních dat. */
function isValidImageBuffer(buf) {
  if (!buf || buf.length < 12) return false;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return true;
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  )
    return true;
  return false;
}

function loadPreviousBySlug() {
  const map = Object.create(null);
  if (!fs.existsSync(OUT_PATH)) return map;
  try {
    const prev = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
    for (const p of prev) {
      if (p && typeof p.slug === "string") map[p.slug] = p;
    }
  } catch {
    // ignore
  }
  return map;
}

/**
 * Sloučí čerstvě stažená data s předchozím záznamem (souřadnice, místnosti, …).
 */
function mergeListing(fetched, prev, sourceUrl) {
  const out = {
    ...fetched,
    sourceUrl,
  };
  if (!prev) return out;

  const optional = ["coordinates", "rooms", "size", "category", "virtualTour"];
  for (const k of optional) {
    if (out[k] == null && prev[k] != null) out[k] = prev[k];
  }

  const fd = out.description || "";
  const pd = prev.description || "";
  if (
    pd.length > fd.length + 80 &&
    (fd.endsWith("…") || fd.endsWith("...") || fd.length < 400)
  ) {
    out.description = pd;
  }

  return out;
}

function extractPrice($) {
  const text = $("body").text().replace(/\s+/g, " ");
  const monthly = text.match(/(\d[\d\s]*)\s*Kč\s*\/\s*měsíc/i);
  if (monthly) return monthly[1].replace(/\s+/g, " ").trim() + " Kč / měsíc";
  const plain = text.match(/(\d[\d\s]*)\s*Kč/);
  return plain ? plain[1].replace(/\s+/g, " ").trim() + " Kč" : undefined;
}

async function fetchListing(source, previousBySlug) {
  const { slug, type, url } = source;
  console.log("Fetching:", slug);

  const res = await fetch(url, {
    headers: {
      "User-Agent": CHROME_UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "cs,en;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  const html = await res.text();

  if (isBotWall(html)) {
    throw new Error(
      "Odpověď vypadá jako bot-ochrana (Anubis). Zkuste jinou síť/VPN nebo doplnit listings.json ručně.",
    );
  }

  const $ = cheerio.load(html);

  const title =
    $('meta[property="og:title"]').attr("content")?.split("|")[0]?.trim() ||
    $("h1").first().text().trim() ||
    slug;

  const ogImage = $('meta[property="og:image"]').attr("content");
  const baseUrl = new URL(url).origin;
  const imageUrls = new Set();
  if (ogImage) imageUrls.add(absoluteUrl(baseUrl, ogImage));

  $("img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src");
    if (!src) return;
    const full = absoluteUrl(baseUrl, src);
    if (
      full &&
      !full.includes("avatar") &&
      !full.includes("logo") &&
      !full.includes("googlemap_placeholder") &&
      !full.includes("/klasik/images/inquiry") &&
      /\.(jpg|jpeg|png|webp)/i.test(full)
    )
      imageUrls.add(full);
  });

  const mainFlat = $("main").text().replace(/\s+/g, " ").trim();

  /** Řez textu mezi popisem a sekci Parametry (meta často končí „…“). */
  let description = "";
  for (const start of [
    "Nabízíme k",
    "Nabízíme k pronájmu",
    "Nabízíme k prodeji",
    "Nabízím k prodeji",
    "Pronájem novostavby",
    "Hledáte k pronájmu",
    "Hledáte rodinné",
    "Rodinný dům se zahradou",
    "Kouzelná zahrada",
    "Hledáte prostory",
  ]) {
    const i = mainFlat.indexOf(start);
    if (i < 0) continue;
    const j = mainFlat.indexOf("Parametry", i + 80);
    const slice = (j > i ? mainFlat.slice(i, j) : mainFlat.slice(i, i + 6500)).trim();
    if (slice.length > 200) {
      description = slice.slice(0, 8000);
      break;
    }
  }

  if (!description || description.length < 120) {
    let longestMainP = "";
    $("main p").each((_, el) => {
      const t = $(el).text().replace(/\s+/g, " ").trim();
      if (t.length > longestMainP.length && t.length > 120) longestMainP = t;
    });
    if (longestMainP) description = longestMainP.slice(0, 8000);
  }

  if (!description || description.length < 50) {
    description = $('meta[name="description"]').attr("content")?.trim() || description;
  }

  let location = "";
  $("p, span, div").each((_, el) => {
    const t = $(el).text().trim();
    if (
      t.match(/^\d{5}\s/) ||
      ((t.includes("Znojmo") ||
        t.includes("Moravský Krumlov") ||
        t.includes("Rosice") ||
        t.includes("Miroslav") ||
        t.includes("Dyje")) &&
        t.length < 90)
    )
      location = t.slice(0, 80);
  });
  if (!location) {
    const addr = $("[class*='adresa'], [class*='lokace'], address").first().text().trim();
    if (addr) location = addr.slice(0, 80);
  }
  if (!location) location = type === "prodej" ? "Znojmo" : "Moravský Krumlov";

  const price = extractPrice($);

  const imageUrlsArr = [...imageUrls].filter(Boolean).slice(0, 20);
  const dir = path.join(PUBLIC_PROPERTIES, slug);
  ensureDir(dir);
  try {
    for (const name of fs.readdirSync(dir)) {
      fs.unlinkSync(path.join(dir, name));
    }
  } catch {
    // ignore
  }
  const images = [];

  for (let i = 0; i < imageUrlsArr.length; i++) {
    const ext = path.extname(new URL(imageUrlsArr[i]).pathname) || ".jpg";
    const filename = `${String(i + 1).padStart(2, "0")}${ext.replace(/\?.*/, "")}`;
    const filepath = path.join(dir, filename);
    try {
      const imgRes = await fetch(imageUrlsArr[i], {
        headers: {
          "User-Agent": CHROME_UA,
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
          Referer: url,
          "Accept-Language": "cs,en;q=0.8",
        },
      });
      if (!imgRes.ok) {
        console.warn("  Skip image (HTTP):", imageUrlsArr[i], imgRes.status);
        continue;
      }
      const buf = Buffer.from(await imgRes.arrayBuffer());
      if (!isValidImageBuffer(buf)) {
        console.warn(
          "  Skip image (not a binary photo — likely bot wall without Referer):",
          imageUrlsArr[i],
        );
        continue;
      }
      safeWriteImageFile(filepath, buf);
      images.push(filename);
    } catch (e) {
      console.warn("  Skip image:", imageUrlsArr[i], e.message);
    }
  }

  if (images.length === 0) images.push("01.jpg");

  const fetched = {
    slug,
    title,
    location,
    type,
    price: price || undefined,
    description: description || undefined,
    images,
  };

  return mergeListing(fetched, previousBySlug[slug], url);
}

async function main() {
  ensureDir(DATA_DIR);
  ensureDir(PUBLIC_PROPERTIES);

  const previousBySlug = loadPreviousBySlug();
  const source = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf8"));
  const listings = [];

  for (const entry of source) {
    try {
      const listing = await fetchListing(entry, previousBySlug);
      listings.push(listing);
    } catch (e) {
      console.error("Error", entry.slug, e.message);
      const prev = previousBySlug[entry.slug];
      if (prev) {
        listings.push({ ...prev, sourceUrl: entry.url });
        console.warn("  Kept previous JSON row for", entry.slug);
      } else {
        console.error("  No previous row for", entry.slug, "- omit from output");
      }
    }
  }

  const json = JSON.stringify(listings, null, 2);
  const tmp = `${OUT_PATH}.tmp`;
  fs.writeFileSync(tmp, json, "utf8");
  try {
    if (fs.existsSync(OUT_PATH)) {
      try {
        fs.chmodSync(OUT_PATH, 0o666);
      } catch {
        // ignore
      }
      fs.unlinkSync(OUT_PATH);
    }
  } catch {
    // ignore
  }
  fs.renameSync(tmp, OUT_PATH);
  console.log("Written", listings.length, "listings to", OUT_PATH);
}

main();
