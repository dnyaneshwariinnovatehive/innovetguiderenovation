import { getDb } from '@/lib/db';
import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function GET(request) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const db = await getDb();
    const res = db.exec('SELECT * FROM custom_project ORDER BY submitted_at DESC');
    const enquiries = res.length ? res[0].values.map(row => Object.fromEntries(res[0].columns.map((c, i) => [c, row[i]]))) : [];
    return Response.json({ enquiries });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
