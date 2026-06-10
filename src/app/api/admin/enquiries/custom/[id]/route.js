import { getDb } from '@/lib/db';
import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function GET(request, { params: paramsPromise }) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const params = await paramsPromise;
    const db = await getDb();
    const res = db.exec('SELECT * FROM custom_project WHERE id = ?', [String(params.id)]);
    if (!res.length) return Response.json({ error: 'Enquiry not found' }, { status: 404 });
    const enquiry = Object.fromEntries(res[0].columns.map((c, i) => [c, res[0].values[0][i]]));
    return Response.json({ enquiry });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch enquiry' }, { status: 500 });
  }
}
