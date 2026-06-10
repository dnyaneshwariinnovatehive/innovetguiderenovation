import { getDb, saveDb } from '@/lib/db';
import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function POST(request, { params: paramsPromise }) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const params = await paramsPromise;
    const db = await getDb();
    db.run("UPDATE project SET status='active' WHERE id=?", [String(params.id)]);
    saveDb();
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: 'Failed to approve project' }, { status: 500 });
  }
}
