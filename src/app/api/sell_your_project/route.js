import { getDb, saveDb } from '@/lib/db';

export async function POST(request) {
  try {
    const db = await getDb();
    const fd = await request.formData();

    db.run(
      `INSERT INTO sell_project_student
       (student_name, email, mobile, college_name, course, year, project_title, developer,
        difficulty, price, domain, description, technologies, video_url, github_url,
        requirements, instructions, screenshots, zip_file, status, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [
        fd.get('student_name'), fd.get('email'), fd.get('mobile'), fd.get('college_name'),
        fd.get('course'), fd.get('year'), fd.get('project_title'), fd.get('developer'),
        fd.get('difficulty'), parseFloat(fd.get('price')) || 0, fd.get('domain'),
        fd.get('description'),
        JSON.stringify((fd.get('technologies') || '').split(',').map((t) => t.trim())),
        fd.get('video_url'), fd.get('github_url'), fd.get('requirements'),
        fd.get('instructions'), null, null, 'pending',
      ]
    );

    saveDb();
    return Response.json({ success: true, message: 'Project submitted successfully' });
  } catch (err) {
    return Response.json({ error: 'Failed to submit project' }, { status: 500 });
  }
}
