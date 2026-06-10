import { getFirst } from '@/lib/db';

export async function GET(request, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const p = await getFirst('SELECT * FROM project WHERE id = ? AND LOWER(status) = ?', [params.id, 'active']);
    if (!p) return Response.json({ error: 'Project not found' }, { status: 404 });

    const tech = typeof p.technologies === 'string' ? JSON.parse(p.technologies) : (p.technologies || []);
    const shots = typeof p.screenshots === 'string' ? JSON.parse(p.screenshots) : (p.screenshots || []);

    const project = {
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

    return Response.json({ project });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
