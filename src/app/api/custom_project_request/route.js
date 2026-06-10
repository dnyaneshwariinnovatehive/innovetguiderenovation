import { execute, dbNow } from '@/lib/db';

export async function POST(request) {
  try {
    const fd = await request.formData();
    await execute(
      `INSERT INTO custom_project (name, email, project_type, budget, technologies, deadline, description, additional_info, submitted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ${dbNow()})`,
      [
        fd.get('name'), fd.get('email'), fd.get('project_type'), fd.get('budget'),
        fd.get('technologies'), fd.get('deadline'), fd.get('description'), fd.get('additional_info'),
      ]
    );
    return Response.json({ success: true, message: 'Custom project request submitted successfully' });
  } catch (err) {
    return Response.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
