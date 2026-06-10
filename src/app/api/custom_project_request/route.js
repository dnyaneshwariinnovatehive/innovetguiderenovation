import { API_BASE } from '@/lib/constants';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const fd = new URLSearchParams();
    for (const [key, val] of formData.entries()) {
      fd.append(key, val);
    }

    const res = await fetch(`${API_BASE}/custom_project_request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: fd.toString(),
      redirect: 'manual',
    });

    if (res.status >= 200 && res.status < 400) {
      return Response.json({ success: true });
    }

    return Response.json({ error: 'Submission failed' }, { status: 400 });
  } catch (err) {
    return Response.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
  }
}
