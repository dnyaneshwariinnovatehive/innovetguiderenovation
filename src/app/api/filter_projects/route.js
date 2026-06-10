import { getDb } from '@/lib/db';

export async function GET(request) {
  try {
    const db = await getDb();
    const url = new URL(request.url);
    const rows = db.exec('SELECT * FROM project WHERE status = ? ORDER BY created_at DESC', ['active']);
    if (!rows.length) return Response.json({ projects: [], total_count: 0 });

    const columns = rows[0].columns;
    const projects = rows[0].values.map((row) => {
      const p = Object.fromEntries(columns.map((c, i) => [c, row[i]]));
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
      return p;
    });

    const perPage = parseInt(url.searchParams.get('per_page')) || 0;
    const page = parseInt(url.searchParams.get('page')) || 1;
    const sliced = perPage > 0 ? projects.slice((page - 1) * perPage, page * perPage) : projects;

    return Response.json({ projects: sliced, total_count: projects.length });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
