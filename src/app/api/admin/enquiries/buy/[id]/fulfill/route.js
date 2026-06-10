import { checkAuth, unauthorized } from '@/lib/adminAuth';

export async function POST(request, { params: paramsPromise }) {
  if (!checkAuth(request)) return unauthorized();
  try {
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
