import { getDb } from '@/lib/db';
import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function POST(request) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const db = await getDb();
    const body = await request.json();
    const { title, description, project_type, difficulty_level, price, domain, technologies, video_tutorial, developer_name, owner_type, status, phase, screenshots } = body;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    db.run(`INSERT INTO project (title, description, project_type, difficulty_level, price, domain, technologies, video_tutorial, developer_name, owner_type, status, phase, screenshots, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description || '', project_type || 'mini', difficulty_level || 'intermediate', price || 0, domain || '', technologies || '', video_tutorial || '', developer_name || 'Admin', owner_type || 'admin', status || 'active', phase || 'planning', screenshots || '[]', now, now]);

    const res = db.exec('SELECT last_insert_rowid() as id');
    const id = res[0].values[0][0];

    return Response.json({ success: true, id }, { status: 201 });
  } catch (err) {
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function GET(request) {
  if (!checkAuth(request)) return unauthorized();
  try {
    const db = await getDb();
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'all';

    let sql = 'SELECT * FROM project ORDER BY created_at DESC';
    if (type === 'pending') sql = "SELECT * FROM project WHERE LOWER(status)='pending' ORDER BY created_at DESC";
    else if (type === 'admin') sql = "SELECT * FROM project WHERE LOWER(owner_type)='admin' ORDER BY created_at DESC";
    else if (type === 'student') sql = "SELECT * FROM project WHERE LOWER(owner_type)='student' ORDER BY created_at DESC";

    const res = db.exec(sql);
    const projects = res.length ? res[0].values.map(row => Object.fromEntries(res[0].columns.map((c, i) => [c, row[i]]))) : [];
    return Response.json({ projects });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
