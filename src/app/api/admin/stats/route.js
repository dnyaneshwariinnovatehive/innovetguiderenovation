import { getDb } from '@/lib/db';
import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function GET(request) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const db = await getDb();
    const r1 = db.exec("SELECT COUNT(*) as c FROM project")[0];
    const r2 = db.exec("SELECT COUNT(*) as c FROM project WHERE LOWER(status)='pending'")[0];
    const r3 = db.exec("SELECT COUNT(*) as c FROM project WHERE LOWER(owner_type)='admin'")[0];
    const r4 = db.exec("SELECT COUNT(*) as c FROM project WHERE LOWER(owner_type)='student'")[0];
    const r5 = db.exec("SELECT COUNT(*) as c FROM project_buy_enquiry")[0];
    const r6 = db.exec("SELECT COUNT(*) as c FROM custom_project")[0];
    const r7 = db.exec("SELECT * FROM project ORDER BY created_at DESC LIMIT 10")[0];

    const cols = (res) => res.columns;
    const vals = (res) => res.values[0];
    const toObj = (res) => res ? Object.fromEntries(res.columns.map((c, i) => [c, res.values[0][i]])) : null;

    const projects = r7 ? r7.values.map(row => Object.fromEntries(r7.columns.map((c, i) => [c, row[i]]))) : [];

    return Response.json({
      stats: {
        total_projects: vals(r1)[0],
        requested_projects: vals(r2)[0],
        admin_projects: vals(r3)[0],
        student_projects: vals(r4)[0],
        buy_enquiries: vals(r5)[0],
        custom_project_enquiries: vals(r6)[0],
      },
      recent_projects: projects,
    });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
