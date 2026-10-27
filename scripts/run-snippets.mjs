#!/usr/bin/env node
/**
 * Runs every standalone snippet under src/snippets/ "when possible".
 *
 *   - Runnable .js/.ts snippets are executed and must exit 0.
 *   - Snippets that cannot run to a clean exit (long-running servers, browser
 *     DevTools heap-snapshot demos, and a deliberate Temporal Dead Zone throw)
 *     are syntax-checked with `node --check` instead.
 *   - Network snippets are executed, but a failure is a warning, not an error
 *     (the external service, not the code, is at fault).
 *   - Snippets Node cannot parse (illustrative TC39 proposal syntax) are skipped.
 *
 * Exits non-zero if any runnable snippet fails or any syntax check fails, so CI
 * blocks broken examples. Run with `npm run snippets`.
 */
import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SNIPPETS = join(ROOT, 'src', 'snippets');
const TIMEOUT_MS = 20_000;

// Valid JavaScript, but not meant to run to a clean exit: long-running servers,
// browser-only DevTools demos, and a deliberate TDZ throw. Syntax-check these.
const SYNTAX_ONLY = new Set([
  'ch04/postRedirectGet.js',
  'ch07/nodeServer.js',
  'ch05/closureWithMemoryLeak.js',
  'ch05/closureWithMemoryClearing.js',
  'ch05/hoistingExample.js',
  'ch05/functionHoisting.js',
]);

// Call a public API (jsonplaceholder.typicode.com): run them, but a failure is
// a warning rather than an error, so an offline or flaky service does not break.
const NETWORK = new Set(['ch05/abortableFetch.js', 'ch05/promiseAll.js']);

// Node cannot parse this (it illustrates a TC39 proposal syntax).
const SKIP = new Set(['ch05/typeAnnotationsProposal.js']);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(SNIPPETS)
  .filter((f) => ['.js', '.ts'].includes(extname(f)))
  .filter((f) => !/[\\/](utils|__tests__)[\\/]/.test(f))
  .sort();

let ran = 0;
let checked = 0;
let skipped = 0;
let warned = 0;
const failures = [];

for (const file of files) {
  const key = relative(SNIPPETS, file).split(/[\\/]/).join('/');
  const firstLine = (s) => (s || '').trim().split('\n').filter(Boolean).pop() || '';

  if (SKIP.has(key)) {
    console.log(`- skip   ${key} (Node cannot parse this proposal syntax)`);
    skipped++;
  } else if (SYNTAX_ONLY.has(key)) {
    const r = spawnSync('node', ['--check', file], { encoding: 'utf8' });
    if (r.status === 0) {
      console.log(`✓ check  ${key}`);
      checked++;
    } else {
      console.log(`✗ check  ${key}`);
      failures.push(`${key} (syntax): ${firstLine(r.stderr)}`);
    }
  } else {
    const r = spawnSync('node', [file], { encoding: 'utf8', timeout: TIMEOUT_MS });
    if (r.status === 0) {
      console.log(`✓ run    ${key}`);
      ran++;
    } else if (NETWORK.has(key)) {
      const why = r.signal ? `timed out after ${TIMEOUT_MS} ms` : firstLine(r.stderr);
      console.log(`⚠ net    ${key} (skipped: ${why})`);
      warned++;
    } else {
      const why = r.signal ? `timed out after ${TIMEOUT_MS} ms` : firstLine(r.stderr);
      console.log(`✗ run    ${key}`);
      failures.push(`${key}: ${why}`);
    }
  }
}

console.log(
  `\nran ${ran}, syntax-checked ${checked}, skipped ${skipped}, network-skipped ${warned}, failed ${failures.length}`,
);
if (failures.length) {
  console.error('\nFailures:');
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
