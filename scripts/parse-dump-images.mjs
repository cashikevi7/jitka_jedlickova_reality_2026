import fs from "node:fs";

const files = [
  "C:/Users/Patri/.cursor/projects/c-Projekty-Mamka-reality-web-2026/agent-tools/6044a5dd-4308-4a51-81d5-97aaeeec9dc9.txt",
  "C:/Users/Patri/.cursor/projects/c-Projekty-Mamka-reality-web-2026/agent-tools/9e661e92-3e57-4362-a098-225aea723d2e.txt",
];

function extract(path) {
  const t = fs.readFileSync(path, "utf8");
  const re = /https:\/\/www\.reality-proradost\.cz\/[^)]+\.(jpg|jpeg)/gi;
  const s = new Set();
  let m;
  while ((m = re.exec(t))) {
    let u = m[0].replace(/temp\/img\/\/+/g, "temp/img/");
    if (u.endsWith(".jpg)+ 19 dalších")) u = u.replace(/\)\+ 19 dalších$/, "");
    if (u.endsWith(".jpg)+ 21 dalších")) u = u.replace(/\)\+ 21 dalších$/, "");
    s.add(u);
  }
  return [...s].sort();
}

for (const f of files) {
  const list = extract(f);
  console.log(f.split("/").pop(), list.length);
  console.log(JSON.stringify(list, null, 2));
}
