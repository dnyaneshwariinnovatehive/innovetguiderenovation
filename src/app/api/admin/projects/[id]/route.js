import { getDb, saveDb } from '@/lib/db';
import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function GET(request, { params: paramsPromise }) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const params = await paramsPromise;
    const db = await getDb();
    const res = db.exec('SELECT * FROM project WHERE id = ?', [String(params.id)]);
    if (!res.length) return Response.json({ error: 'Project not found' }, { status: 404 });
    const project = Object.fromEntries(res[0].columns.map((c, i) => [c, res[0].values[0][i]]));
    return Response.json({ project });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request, { params: paramsPromise }) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const params = await paramsPromise;
    const body = await request.json();
    const db = await getDb();
    db.run(
      `UPDATE project SET title=?, price=?, domain=?, project_type=?, difficulty_level=?, status=?, description=?, technologies=?, phase=?, video_tutorial=?, developer_name=? WHERE id=?`,
      [
        body.title, parseFloat(body.price) || 0, body.domain, body.project_type,
        body.difficulty_level, body.status, body.description, body.technologies,
        body.phase || 'planning', body.video_tutorial || null, body.developer_name || 'Admin',
        String(params.id),
      ]
    );
    saveDb();
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params: paramsPromise }) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const params = await paramsPromise;
    const db = await getDb();
    db.run('DELETE FROM project WHERE id = ?', [String(params.id)]);
    saveDb();
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
