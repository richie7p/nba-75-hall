import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const UA =
  "NBA75Hall/1.0 (https://grok.com; educational museum exhibit; portraits from Wikipedia)";
const OUT = "/workspace/public/portraits";

const TITLES = {
  "kareem-abdul-jabbar": "Kareem_Abdul-Jabbar",
  "ray-allen": "Ray_Allen",
  "giannis-antetokounmpo": "Giannis_Antetokounmpo",
  "carmelo-anthony": "Carmelo_Anthony",
  "nate-archibald": "Nate_Archibald",
  "paul-arizin": "Paul_Arizin",
  "charles-barkley": "Charles_Barkley",
  "rick-barry": "Rick_Barry",
  "elgin-baylor": "Elgin_Baylor",
  "dave-bing": "Dave_Bing",
  "larry-bird": "Larry_Bird",
  "kobe-bryant": "Kobe_Bryant",
  "wilt-chamberlain": "Wilt_Chamberlain",
  "bob-cousy": "Bob_Cousy",
  "dave-cowens": "Dave_Cowens",
  "billy-cunningham": "Billy_Cunningham",
  "stephen-curry": "Stephen_Curry",
  "anthony-davis": "Anthony_Davis",
  "dave-debuschere": "Dave_DeBusschere",
  "clyde-drexler": "Clyde_Drexler",
  "tim-duncan": "Tim_Duncan",
  "kevin-durant": "Kevin_Durant",
  "julius-erving": "Julius_Erving",
  "patrick-ewing": "Patrick_Ewing",
  "walt-frazier": "Walt_Frazier",
  "kevin-garnett": "Kevin_Garnett",
  "george-gervin": "George_Gervin",
  "hal-greer": "Hal_Greer",
  "james-harden": "James_Harden",
  "john-havlicek": "John_Havlicek",
  "elvin-hayes": "Elvin_Hayes",
  "allen-iverson": "Allen_Iverson",
  "lebron-james": "LeBron_James",
  "magic-johnson": "Magic_Johnson",
  "sam-jones": "Sam_Jones_(basketball,_born_1933)",
  "michael-jordan": "Michael_Jordan",
  "jason-kidd": "Jason_Kidd",
  "kawhi-leonard": "Kawhi_Leonard",
  "damian-lillard": "Damian_Lillard",
  "jerry-lucas": "Jerry_Lucas",
  "karl-malone": "Karl_Malone",
  "moses-malone": "Moses_Malone",
  "pete-maravich": "Pete_Maravich",
  "bob-mcadoo": "Bob_McAdoo",
  "kevin-mchale": "Kevin_McHale",
  "george-mikan": "George_Mikan",
  "reggie-miller": "Reggie_Miller",
  "earl-monroe": "Earl_Monroe",
  "steve-nash": "Steve_Nash",
  "dirk-nowitzki": "Dirk_Nowitzki",
  "hakeem-olajuwon": "Hakeem_Olajuwon",
  "shaquille-oneal": "Shaquille_O'Neal",
  "robert-parish": "Robert_Parish",
  "chris-paul": "Chris_Paul",
  "gary-payton": "Gary_Payton",
  "bob-pettit": "Bob_Pettit",
  "paul-pierce": "Paul_Pierce",
  "scottie-pippen": "Scottie_Pippen",
  "willis-reed": "Willis_Reed",
  "oscar-robertson": "Oscar_Robertson",
  "david-robinson": "David_Robinson",
  "dennis-rodman": "Dennis_Rodman",
  "bill-russell": "Bill_Russell",
  "dolph-schayes": "Dolph_Schayes",
  "bill-sharman": "Bill_Sharman",
  "john-stockton": "John_Stockton",
  "isiah-thomas": "Isiah_Thomas",
  "nate-thurmond": "Nate_Thurmond",
  "wes-unseld": "Wes_Unseld",
  "dwyane-wade": "Dwyane_Wade",
  "bill-walton": "Bill_Walton",
  "jerry-west": "Jerry_West",
  "russell-westbrook": "Russell_Westbrook",
  "lenny-wilkens": "Lenny_Wilkens",
  "dominique-wilkins": "Dominique_Wilkins",
  "james-worthy": "James_Worthy",
};

function extFrom(url, type) {
  const u = url.toLowerCase();
  if (u.includes(".png") || type.includes("png")) return "png";
  if (u.includes(".webp") || type.includes("webp")) return "webp";
  if (u.includes(".gif")) return "gif";
  return "jpg";
}

async function getJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function summaryThumb(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const data = await getJson(url);
  const src = data?.originalimage?.source || data?.thumbnail?.source;
  if (!src) throw new Error("no image");
  return src.replace(/\/\d+px-/, "/800px-");
}

async function searchThumb(id, title) {
  const q = title.replaceAll("_", " ").replace(/[()]/g, "");
  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `${q} basketball`,
      gsrlimit: "3",
      prop: "pageimages",
      piprop: "thumbnail",
      pithumbsize: "800",
      format: "json",
      origin: "*",
    });
  const data = await getJson(url);
  const pages = Object.values(data?.query?.pages ?? {});
  const withImg = pages.find((p) => p.thumbnail?.source);
  if (!withImg) throw new Error("search miss " + id);
  return withImg.thumbnail.source;
}

async function download(src, destBase) {
  const res = await fetch(src, {
    headers: { "User-Agent": UA, Accept: "image/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`dl ${res.status} ${src}`);
  const type = res.headers.get("content-type") || "";
  const ext = extFrom(src, type);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error("too small");
  const dest = `${destBase}.${ext}`;
  await writeFile(dest, buf);
  return { ext, bytes: buf.length };
}

async function one(id, title) {
  const destBase = path.join(OUT, id);
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (existsSync(`${destBase}.${ext}`)) {
      return { id, ext, skip: true };
    }
  }
  let src;
  try {
    src = await summaryThumb(title);
  } catch {
    src = await searchThumb(id, title);
  }
  const { ext, bytes } = await download(src, destBase);
  return { id, ext, bytes, src };
}

await mkdir(OUT, { recursive: true });

const entries = Object.entries(TITLES);
const results = [];
const failed = [];
const conc = 4;
for (let i = 0; i < entries.length; i += conc) {
  const chunk = entries.slice(i, i + conc);
  const part = await Promise.allSettled(
    chunk.map(([id, title]) => one(id, title)),
  );
  for (const r of part) {
    if (r.status === "fulfilled") {
      results.push(r.value);
      console.log(
        r.value.skip ? `skip ${r.value.id}` : `ok ${r.value.id} ${r.value.ext} ${r.value.bytes}`,
      );
    } else {
      failed.push(r.reason?.message || String(r.reason));
      console.error("fail", r.reason?.message || r.reason);
    }
  }
}

const map = {};
for (const r of results) map[r.id] = `/portraits/${r.id}.${r.ext}`;
await writeFile(
  "/workspace/src/data/photos.ts",
  `export const PHOTOS: Record<string, string> = ${JSON.stringify(map, null, 2)};\n`,
);
console.log(JSON.stringify({ ok: results.length, fail: failed.length, failed }, null, 2));
