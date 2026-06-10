import { API_BASE } from '@/lib/constants';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const res = await fetch(`${API_BASE}/api/filter_projects?${params.toString()}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch projects' }, { status: res.status });
    }
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
