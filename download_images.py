# Ulož jako: download_images.py
# Spusť: python download_images.py

import os
import requests
import re
from pathlib import Path
from urllib.parse import urljoin

# --- KONFIGURACE ---
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

PROPERTIES = [
    {
        "slug": "pronajem-byt-1kk-moravsky-krumlov",
        "url": "https://www.reality-proradost.cz/reality/pronajem-bytu-1-kk-mor-krumlov-29128/",
    },
    {
        "slug": "prodej-byt-3plus1-znojmo",
        "url": "https://www.reality-proradost.cz/reality/prodej-bytu-3-1-znojmo-28998/",
    },
    {
        "slug": "prodej-dum-znojmo-28084",
        "url": "https://www.reality-proradost.cz/reality/prodej-rodinneho-domu-28084/",
    },
    {
        "slug": "prodej-dum-120m2-znojmo",
        "url": "https://www.reality-proradost.cz/reality/prodej-rodinneho-domu-120-m2-zahrada-1128-m2-27823/",
    },
    {
        "slug": "prodej-zahrada-moravsky-krumlov",
        "url": "https://www.reality-proradost.cz/reality/prodej-zahrady-756-m2-v-moravskem-krumlove-27385/",
    },
    {
        "slug": "pronajem-komercni-27m2",
        "url": "https://www.reality-proradost.cz/reality/pronajem-komercnich-prostor-27-m2-16541/",
    },
]

PERSONAL_PHOTOS = [
    "https://www.jitkajedlickova.cz/wp-content/uploads/2024/09/Jitka-Jedlickova-foto-1.jpg",
    "https://www.jitkajedlickova.cz/wp-content/uploads/2024/09/Jitka-Jedlickova-foto-kontakt.jpg",
]


def download_file(url, dest_path):
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        with open(dest_path, "wb") as f:
            f.write(r.content)
        print(f"  ✓ {dest_path}")
    except Exception as e:
        print(f"  ✗ {url} → {e}")


def scrape_property_images(slug, page_url):
    folder = Path(f"public/images/properties/{slug}")
    folder.mkdir(parents=True, exist_ok=True)
    r = requests.get(page_url, headers=HEADERS, timeout=15)
    # Najdi všechny .jpg/.webp obrázky v HTML
    imgs = re.findall(
        r'(?:src|href|data-src)=["\']([^"\']*(?:\.jpg|\.jpeg|\.webp|\.png)[^"\']*)["\']',
        r.text,
        re.IGNORECASE,
    )
    # Filtruj jen fotky nemovitostí (ne loga, ikony)
    imgs = list(
        dict.fromkeys(
            [
                urljoin(page_url, i)
                for i in imgs
                if any(
                    x in i
                    for x in ["/foto", "/reality", "/nemovitost", "/img", "/upload", "/media"]
                )
                and "logo" not in i.lower()
                and "icon" not in i.lower()
            ]
        )
    )
    print(f"\n[{slug}] Nalezeno {len(imgs)} fotek")
    for idx, img_url in enumerate(imgs[:20]):  # max 20 fotek na nemovitost
        ext = img_url.split("?")[0].split(".")[-1].lower()
        if ext not in ("jpg", "jpeg", "webp", "png"):
            ext = "jpg"
        download_file(img_url, folder / f"{idx+1:02d}.{ext}")


# Stáhni fotky nemovitostí
for prop in PROPERTIES:
    scrape_property_images(prop["slug"], prop["url"])

# Stáhni osobní fotky
personal_folder = Path("public/images/profile")
personal_folder.mkdir(parents=True, exist_ok=True)
print("\n[Osobní fotky]")
for idx, url in enumerate(PERSONAL_PHOTOS):
    ext = url.split(".")[-1].lower().split("?")[0]
    if ext not in ("jpg", "jpeg", "webp", "png"):
        ext = "jpg"
    download_file(url, personal_folder / f"jitka-{idx+1:02d}.{ext}")

print("\n✅ Hotovo! Zkontroluj složky: public/images/")
