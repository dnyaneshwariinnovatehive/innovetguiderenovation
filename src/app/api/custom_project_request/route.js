import { getDb, saveDb } from '@/lib/db';

export async function POST(request) {
  try {
    const db = await getDb();
    const fd = await request.formData();
    db.run(
      `INSERT INTO custom_project (name, email, project_type, budget, technologies, deadline, description, additional_info, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [
        fd.get('name'), fd.get('email'), fd.get('project_type'), fd.get('budget'),
        fd.get('technologies'), fd.get('deadline'), fd.get('description'), fd.get('additional_info'),
      ]
    );
    saveDb();
    return Response.json({ success: true, message: 'Custom project request submitted successfully' });
  } catch (err) {
    return Response.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
