import { API_BASE } from '@/lib/constants';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const res = await fetch(`${API_BASE}/sell_your_project`, {
      method: 'POST',
      body: formData,
      redirect: 'manual',
    });

    if (res.status >= 200 && res.status < 400) {
      return Response.json({ success: true });
    }

    const text = await res.text();
    const msg = text.includes('error') ? text : 'Submission failed';
    return Response.json({ error: msg }, { status: 400 });
  } catch (err) {
    return Response.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
  }
}
