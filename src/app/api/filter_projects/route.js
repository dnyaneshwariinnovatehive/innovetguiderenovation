import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const projects = await query('SELECT * FROM project WHERE LOWER(status) = ? ORDER BY created_at DESC', ['active']);
    if (!projects.length) return Response.json({ projects: [], total_count: 0 });

    const mapped = projects.map((p) => {
      const tech = typeof p.technologies === 'string' ? JSON.parse(p.technologies) : (p.technologies || []);
      const shots = typeof p.screenshots === 'string' ? JSON.parse(p.screenshots) : (p.screenshots || []);
      return {
        ...p,
        technologies: tech,
        screenshots: shots,
        technology: tech,
        difficulty: p.difficulty_level || 'Intermediate',
        rating: 4,
        popularity: 80,
        date_added: p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        seller: p.developer_name || 'Admin',
        image: shots.length > 0 ? shots[0] : `https://via.placeholder.com/300x200?text=${(p.title || '').replace(/\s+/g, '+')}`,
        sales_count: 10,
      };
    });

    const perPage = parseInt(url.searchParams.get('per_page')) || 0;
    const page = parseInt(url.searchParams.get('page')) || 1;
    const sliced = perPage > 0 ? mapped.slice((page - 1) * perPage, page * perPage) : mapped;

    return Response.json({ projects: sliced, total_count: mapped.length });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
