import crypto from 'crypto';

const ADMIN_USER = 'admin@123';
const ADMIN_PASS = 'admin@123';
const TOKEN_SECRET = 'innovateguide-admin-secret-2025';

function makeToken() {
  return crypto.createHash('sha256').update(`${ADMIN_USER}:${ADMIN_PASS}:${TOKEN_SECRET}`).digest('hex');
}

export const ADMIN_TOKEN = makeToken();

export function checkAuth(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  return match && match[1] === ADMIN_TOKEN;
}

export function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
