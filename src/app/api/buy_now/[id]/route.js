import { execute, dbNow } from '@/lib/db';

export async function POST(request, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const fd = await request.formData();
    await execute(
      `INSERT INTO project_buy_enquiry (project_id, full_name, email, mobile, college, branch, year, city_state, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ${dbNow()})`,
      [
        params.id, fd.get('full_name'), fd.get('email'), fd.get('mobile'),
        fd.get('college'), fd.get('branch'), fd.get('year'), fd.get('city_state'),
      ]
    );
    return Response.json({ success: true, message: 'Purchase enquiry submitted successfully' });
  } catch (err) {
    return Response.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
