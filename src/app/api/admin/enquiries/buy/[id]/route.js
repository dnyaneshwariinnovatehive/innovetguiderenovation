import { getDb, saveDb } from '@/lib/db';
import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function GET(request, { params: paramsPromise }) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const params = await paramsPromise;
    const db = await getDb();
    const res = db.exec('SELECT * FROM project_buy_enquiry WHERE id = ?', [String(params.id)]);
    if (!res.length) return Response.json({ error: 'Enquiry not found' }, { status: 404 });
    const enquiry = Object.fromEntries(res[0].columns.map((c, i) => [c, res[0].values[0][i]]));
    const projRes = db.exec('SELECT * FROM project WHERE id = ?', [String(enquiry.project_id)]);
    const project = projRes.length ? Object.fromEntries(projRes[0].columns.map((c, i) => [c, projRes[0].values[0][i]])) : null;
    return Response.json({ enquiry, project });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch enquiry' }, { status: 500 });
  }
}

export async function DELETE(request, { params: paramsPromise }) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const params = await paramsPromise;
    const db = await getDb();
    db.run('DELETE FROM project_buy_enquiry WHERE id = ?', [String(params.id)]);
    saveDb();
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
