import fs from 'fs';
import path from 'path';

let pool = null;
let SQL = null;
let sqliteDb = null;

function usePg() {
  return !!(process.env.POSTGRES_URL || process.env.VERCEL);
}

async function getSqlJs() {
  if (!SQL) {
    const initSqlJs = await import('sql.js').then(m => m.default || m);
    SQL = await initSqlJs({
      locateFile: (file) => path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file),
    });
  }
  return SQL;
}

function toPgSql(sql) {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

async function getPool() {
  if (pool) return pool;
  const { Pool } = await import('@neondatabase/serverless');
  pool = new Pool({ connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL });
  await ensureSchema();
  return pool;
}

async function getSqliteDb() {
  if (sqliteDb) return sqliteDb;
  if (!SQL) await getSqlJs();
  const tmpPath = '/tmp/innovateguide.db';
  const srcPath = path.join(process.cwd(), 'data', 'innovateguide.db');
  let buffer;
  if (fs.existsSync(tmpPath)) {
    buffer = fs.readFileSync(tmpPath);
  } else {
    buffer = fs.readFileSync(srcPath);
    fs.cpSync(srcPath, tmpPath);
  }
  sqliteDb = new SQL.Database(buffer);
  sqliteDb.run('PRAGMA journal_mode=WAL');
  return sqliteDb;
}

function saveSqliteDb() {
  if (!sqliteDb) return;
  const data = sqliteDb.export();
  fs.writeFileSync('/tmp/innovateguide.db', Buffer.from(data));
}

export async function query(sql, params = []) {
  if (usePg()) {
    const client = await getPool();
    const { rows } = await client.query(toPgSql(sql), params);
    return rows;
  }
  const db = await getSqliteDb();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export async function getFirst(sql, params = []) {
  const rows = await query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export function dbNow() {
  return usePg() ? 'NOW()' : "datetime('now')";
}

export async function execute(sql, params = []) {
  if (usePg()) {
    const client = await getPool();
    await client.query(toPgSql(sql), params);
  } else {
    const db = await getSqliteDb();
    db.run(sql, params);
    saveSqliteDb();
  }
}

let schemaEnsured = false;

async function ensureSchema() {
  if (schemaEnsured) return;
  schemaEnsured = true;
  const { rows } = await pool.query(
    `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'project') as exists`
  );
  if (rows[0].exists) return;
  const schemaSql = fs.readFileSync(path.join(process.cwd(), 'data', 'schema.sql'), 'utf-8');
  const statements = schemaSql.split(';').filter(s => s.trim());
  for (const stmt of statements) {
    await pool.query(stmt);
  }
  const seedPath = path.join(process.cwd(), 'data', 'seed.sql');
  if (fs.existsSync(seedPath)) {
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    const seedStatements = seedSql.split(';').filter(s => s.trim());
    for (const stmt of seedStatements) {
      await pool.query(stmt);
    }
  }
}
