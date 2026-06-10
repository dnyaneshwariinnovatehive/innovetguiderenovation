import { getDb, saveDb } from '@/lib/db';
import { ADMIN_TOKEN } from '@/lib/adminAuth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (username === 'admin@123' && password === 'admin@123') {
      const response = Response.json({ success: true });
      response.headers.set('Set-Cookie', `admin_token=${ADMIN_TOKEN}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
      return response;
    }
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
