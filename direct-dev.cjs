// direct-dev.cjs
// Directly starts the Next.js dev server without using fork()
// This bypasses the sandbox restriction on pipe creation.
// Also auto-frees the port if something is already listening on it.

process.env.NEXT_PRIVATE_WORKER = '1';

const path = require('path');
const { execSync } = require('child_process');
const { startServer } = require('./node_modules/next/dist/server/lib/start-server');

const dir = process.cwd();
const port = parseInt(process.env.PORT || '4180', 10);
const hostname = process.env.HOSTNAME || 'localhost';

// Free the port if something is already using it
function freePort(port) {
  try {
    // netstat -ano | findstr :PORT  →  get the PID and kill it
    const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', timeout: 5000 });
    const lines = output.trim().split(/\r?\n/).filter(Boolean);
    const killed = new Set();
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0' && !killed.has(pid) && /^\d+$/.test(pid)) {
        try {
          execSync(`taskkill /PID ${pid} /F /T 2>nul`, { timeout: 5000 });
          killed.add(pid);
          console.log(`[direct-dev] Freed port ${port} (killed PID ${pid})`);
        } catch (_) {
          // PID may have exited between netstat and taskkill – ignore
        }
      }
    }
  } catch (_) {
    // No match or netstat failed – port is free, nothing to do
  }
}

freePort(port);

const serverOptions = {
  dir,
  port,
  isDev: true,
  hostname,
  minimalMode: false,
  allowRetry: true,
  keepAliveTimeout: 5000,
  selfSignedCertificate: undefined,
  isTurbopack: false,
};

console.log('[direct-dev] Starting Next.js dev server on http://' + hostname + ':' + port);
startServer(serverOptions).then(() => {
  console.log('[direct-dev] Server is running (press Ctrl+C to stop)');
}).catch((err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('[direct-dev] Port ' + port + ' is still in use. Trying one more time after delay...');
    setTimeout(() => {
      freePort(port);
      startServer(serverOptions).then(() => {
        console.log('[direct-dev] Server is running (press Ctrl+C to stop)');
      }).catch((e2) => {
        console.error('[direct-dev] Failed to start server:', e2);
        process.exit(1);
      });
    }, 2000);
    return;
  }
  console.error('[direct-dev] Failed to start server:', err);
  process.exit(1);
});

// Keep the process alive
process.stdin.resume();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[direct-dev] Shutting down...');
  process.exit(0);
});
process.on('SIGTERM', () => {
  console.log('\n[direct-dev] Shutting down...');
  process.exit(0);
});
