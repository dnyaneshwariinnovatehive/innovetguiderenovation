import { getDb } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const db = await getDb();
    const rows = db.exec('SELECT * FROM project WHERE id = ? AND status = ?', [String(params.id), 'active']);
    if (!rows.length) return Response.json({ error: 'Project not found' }, { status: 404 });

    const columns = rows[0].columns;
    const p = Object.fromEntries(columns.map((c, i) => [c, rows[0].values[0][i]]));
    p.technologies = p.technologies ? JSON.parse(p.technologies) : [];
    p.screenshots = p.screenshots ? JSON.parse(p.screenshots) : [];
    p.technology = p.technologies;
    p.difficulty = p.difficulty_level || 'Intermediate';
    p.rating = 4;
    p.popularity = 80;
    p.date_added = p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    p.seller = p.developer_name || 'Admin';
    p.image = (p.screenshots && p.screenshots.length > 0) ? p.screenshots[0] : `https://via.placeholder.com/300x200?text=${p.title.replace(/\s+/g, '+')}`;
    p.sales_count = 10;

    return Response.json({ project: p });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
