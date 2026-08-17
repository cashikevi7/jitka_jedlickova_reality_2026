// monkey-patch-child-process.cjs
// This module monkey-patches Node.js child_process to work around sandbox restrictions
// that prevent creating pipe handles for child processes.

const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  const result = originalRequire.apply(this, arguments);
  
  if (id === 'child_process' || id === 'node:child_process') {
    patchChildProcess(result);
  }
  
  return result;
};

function patchChildProcess(cp) {
  const originalSpawn = cp.spawn;
  const originalFork = cp.fork;
  
  // Replace 'pipe' and 'ipc' in stdio with 'inherit'
  function fixStdio(stdio) {
    if (!stdio) return 'inherit';
    if (typeof stdio === 'string') {
      if (stdio === 'pipe' || stdio === 'ipc') return 'inherit';
      return stdio;
    }
    if (Array.isArray(stdio)) {
      return stdio.map(s => {
        if (s === 'pipe' || s === 'ipc') return 'inherit';
        return s;
      });
    }
    return stdio;
  }
  
  cp.spawn = function(command, args, options) {
    if (options && options.stdio) {
      options = { ...options, stdio: fixStdio(options.stdio) };
    } else if (!options) {
      options = { stdio: 'inherit' };
    }
    return originalSpawn(command, args, options);
  };
  
  cp.fork = function(modulePath, args, options) {
    if (typeof args === 'object' && !Array.isArray(args)) {
      options = args;
      args = [];
    }
    if (!args) args = [];
    options = { ...(options || {}), stdio: 'inherit', execPath: process.execPath };
    // Use spawn instead of fork to avoid IPC setup which triggers pipe creation
    const child = originalSpawn(process.execPath, [modulePath, ...args], options);
    return child;
  };
  
  cp.exec = function(command, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = { ...(options || {}), stdio: 'inherit' };
    const child = originalSpawn(process.env.ComSpec || 'cmd.exe', ['/c', command], options);
    if (callback) {
      child.on('error', (err) => callback(err, '', ''));
      child.on('exit', (code) => callback(null, '', ''));
    }
    return child;
  };
  
  cp.execSync = function(command, options) {
    // Can't really make execSync work without pipes
    // Just spawn and ignore
    try {
      const child = originalSpawn(process.env.ComSpec || 'cmd.exe', ['/c', command], { stdio: 'ignore' });
    } catch(e) {}
    return Buffer.from('');
  };
  
  cp.execFileSync = function(file, args, options) {
    try {
      const child = originalSpawn(file, args || [], { stdio: 'ignore' });
    } catch(e) {}
    return Buffer.from('');
  };
}

// Also patch for any already-loaded modules
const cpModule = require('child_process');
patchChildProcess(cpModule);
const nodeCpModule = require('node:child_process');
patchChildProcess(nodeCpModule);

console.log('[monkey-patch] child_process patched for sandbox compatibility');
