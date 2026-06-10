import { getDb } from '@/lib/db';
import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function GET(request) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const db = await getDb();
    const res = db.exec("SELECT * FROM project WHERE LOWER(owner_type)='admin' ORDER BY created_at DESC");
    const projects = res.length ? res[0].values.map(row => Object.fromEntries(res[0].columns.map((c, i) => [c, row[i]]))) : [];
    return Response.json({ projects });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
