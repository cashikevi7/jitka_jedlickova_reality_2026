const urls = [
  "https://www.reality-proradost.cz/reality/prodej-garaze-v-moravskem-krumlove-29162/",
  "https://www.reality-proradost.cz/reality/prodej-bytu-3-1-znojmo-28998/",
  "https://www.reality-proradost.cz/reality/prodej-rodinneho-domu-28084/",
  "https://www.reality-proradost.cz/reality/prodej-rodinneho-domu-120-m2-zahrada-1128-m2-27823/",
  "https://www.reality-proradost.cz/reality/prodej-zahrady-756-m2-v-moravskem-krumlove-27385/",
  "https://www.reality-proradost.cz/reality/pronajem-komercnich-prostor-27-m2-16541/",
];

function norm(u) {
  return u.replace(/temp\/img\/\/+/g, "temp/img/");
}

for (const u of urls) {
  const r = await fetch(u, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; MamkaRealitySync/1.0)" },
  });
  const html = await r.text();
  const re =
    /https:\/\/www\.reality-proradost\.cz\/[^"'\\\s>]+\.(jpg|jpeg|png|webp)/gi;
  const set = new Set();
  let m;
  while ((m = re.exec(html))) {
    const x = norm(m[0]);
    if (x.includes("/data/zs/foto/")) set.add(x);
  }
  console.log("---", u);
  console.log(JSON.stringify([...set].sort(), null, 2));
}
