/**
 * Uvolní TCP port (Windows: taskkill podle netstat).
 * Použití: node scripts/free-port.mjs 4100
 */
import { execSync } from "node:child_process";

const port = process.argv[2] ?? "4100";

if (process.platform !== "win32") {
  try {
    execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null`, { shell: "/bin/bash" });
  } catch {
    /* port volný */
  }
  process.exit(0);
}

try {
  const out = execSync(`netstat -ano | findstr :${port}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  const pids = new Set();
  for (const line of out.split(/\r?\n/)) {
    if (!line.includes("LISTENING")) continue;
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && /^\d+$/.test(pid)) pids.add(pid);
  }
  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
    } catch {
      /* proces už neexistuje */
    }
  }
} catch {
  /* nic neposlouchá */
}
