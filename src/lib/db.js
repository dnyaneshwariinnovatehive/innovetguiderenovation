import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';

let SQL = null;
let db = null;

export async function getDb() {
  if (db) return db;
  if (!SQL) {
    const wasmPath = path.join(process.cwd(), 'public', 'sql-wasm.wasm');
    SQL = await initSqlJs({
      locateFile: (file) => fs.existsSync(wasmPath) ? wasmPath : path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file),
    });
  }
  const tmpPath = '/tmp/innovateguide.db';
  const srcPath = path.join(process.cwd(), 'data', 'innovateguide.db');
  let buffer;
  if (fs.existsSync(tmpPath)) {
    buffer = fs.readFileSync(tmpPath);
  } else {
    buffer = fs.readFileSync(srcPath);
    fs.cpSync(srcPath, tmpPath);
  }
  db = new SQL.Database(buffer);
  db.run('PRAGMA journal_mode=WAL');
  return db;
}

export function saveDb() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync('/tmp/innovateguide.db', Buffer.from(data));
}
