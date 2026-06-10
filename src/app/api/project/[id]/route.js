import { API_BASE } from '@/lib/constants';

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const res = await fetch(`${API_BASE}/api/filter_projects`, { next: { revalidate: 30 } });
    const data = await res.json();
    const projects = data.projects || [];
    const project = projects.find((p) => String(p.id) === String(id));

    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    return Response.json({ project });
  } catch (err) {
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
