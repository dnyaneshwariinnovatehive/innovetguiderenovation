from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, session
import os
from datetime import datetime
from functools import wraps
from models import Project, ProjectBuyEnquiry, CustomProject, db
import json

# Cloudinary Configuration (optional)
try:
    import cloudinary
    import cloudinary.uploader
    from cloudinary.utils import cloudinary_url
    cloudinary.config(
        cloud_name = "dbiqndrd5",
        api_key = "348394834615821",
        api_secret = "7qWZQmEroUn7EaUDP90Huwrnk6w",
        secure=True
    )
    CLOUDINARY_AVAILABLE = True
except ImportError:
    CLOUDINARY_AVAILABLE = False

  # Needed for flash messages

admin_bp = Blueprint(
    "admin",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/admin/static"
)

# Admin credentials
ADMIN_USERNAME = 'admin@123'
ADMIN_PASSWORD = 'admin@123'

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_logged_in' not in session:
            return redirect(url_for('admin.login'))
        return f(*args, **kwargs)
    return decorated_function


@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['admin_logged_in'] = True
            return redirect(url_for('admin.dashboard'))
        else:
            flash('Invalid credentials', 'error')
    return render_template('login.html')

@admin_bp.route('/logout')
@login_required
def logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin.login'))

@admin_bp.route('/')
@login_required
def dashboard():
    # Get stats from database
    total_projects = Project.query.count()
    requested_projects = Project.query.filter_by(status='pending').count()
    admin_projects = Project.query.filter_by(owner_type='admin').count()
    student_projects = Project.query.filter_by(owner_type='student').count()
    buy_enquiries = ProjectBuyEnquiry.query.count()
    custom_project_enquiries = CustomProject.query.count()

    stats = {
        "total_projects": total_projects,
        "requested_projects": requested_projects,
        "admin_projects": admin_projects,
        "student_projects": student_projects,
        "buy_enquiries": buy_enquiries,
        "custom_project_enquiries": custom_project_enquiries
    }

    # Get recent projects for dashboard
    recent_projects = Project.query.order_by(Project.created_at.desc()).limit(10).all()
    projects_data = [project.to_dict() for project in recent_projects]

    return render_template('dashboard.html', projects=projects_data, stats=stats)

@admin_bp.route('/add-new-project')
@login_required
def add_new_project_page():
    return render_template('add_new_project.html')

@admin_bp.route('/add_project', methods=['POST'])
@login_required
def add_project():
    if request.method == 'POST':
        # Get form data
        title = request.form.get('project-title')
        difficulty = request.form.get('difficulty-level')
        price = float(request.form.get('price', 0))
        domain = request.form.get('domain')
        project_type = request.form.get('project-type')
        description = request.form.get('description')
        technologies = request.form.get('technologies')
        video_url = request.form.get('video-url')

        # Handle file uploads (placeholder - in real app, save files)
        screenshots = request.files.getlist('screenshots')
        zip_file = request.files.get('zip-file')

        # Create new project in database
        new_project = Project(
            title=title,
            description=description,
            price=price,
            domain=domain,
            project_type=project_type,
            difficulty_level=difficulty,
            owner_type='admin',
            developer_name='Admin',
            technologies=json.dumps(technologies.split(',')) if technologies else None,
            video_tutorial=video_url,
            status='active'
        )

        db.session.add(new_project)
        db.session.commit()

        flash('Project added successfully!', 'success')
        return redirect(url_for('admin.dashboard'))

@admin_bp.route('/delete_project/<int:project_id>', methods=['POST'])
@login_required
def delete_project(project_id):
    project = Project.query.get(project_id)
    if project:
        db.session.delete(project)
        db.session.commit()
        flash('Project deleted successfully!', 'success')
    else:
        flash('Project not found!', 'error')
    return redirect(url_for('admin.dashboard'))

@admin_bp.route('/requested-projects')
@login_required
def requested_projects():
    requested_projects = Project.query.filter_by(status='pending').all()
    projects_data = [project.to_dict() for project in requested_projects]
    return render_template('requested_projects.html', projects=projects_data)

@admin_bp.route('/requested-project-details/<int:project_id>')
@login_required
def requested_project_details(project_id):
    # Find the requested project from database
    project = Project.query.filter_by(id=project_id, status='pending').first()

    if project:
        project_dict = project.to_dict()
        project_details = {
            "id": project_id,
            "student": {
                "name": project.student_name or project_dict.get('student_name', 'N/A'),
                "email": project.student_email or project_dict.get('student_email', 'N/A'),
                "phone": project.student_phone or project_dict.get('student_phone', '+1 (555) 123-4567'),
                "message_no": f"MSG-{project_id:03d}",
                "college": project.student_college or project_dict.get('student_college', 'N/A'),
                "course": project.student_course or project_dict.get('student_course', 'N/A'),
                "year": project.student_year or project_dict.get('student_year', 'N/A')
            },
            "project": {
                "title": project.title,
                "difficulty": project.difficulty_level or 'Intermediate',
                "project_type": project.project_type or 'Mini Project',
                "description": project.description or 'No description available',
                "developer": project.student_name or project.developer_name or 'N/A',
                "price": f"₹{project.price}",
                "domain": project.domain or 'N/A',
                "technologies": ', '.join(project_dict.get('technologies', [])) or 'Not specified',
                "video_url": project.video_tutorial or "https://youtube.com/watch?v=example123"
            },
            "screenshots": project_dict.get('screenshots', [])
        }

        return render_template('requested_projects_details.html', project=project_details)
    else:
        flash('Project not found!', 'error')
        return redirect(url_for('admin.requested_projects'))

@admin_bp.route('/admin-projects')
@login_required
def admin_projects():
    admin_projects = Project.query.filter_by(owner_type='admin').all()
    admin_projects_data = [project.to_dict() for project in admin_projects]
    return render_template('admin_project.html', admin_projects=admin_projects_data)

@admin_bp.route('/admin-projects/<int:project_id>')
@login_required
def admin_project_details(project_id):
    # Find the admin project from database
    project = Project.query.filter_by(id=project_id, owner_type='admin').first()

    if project:
        project_data = project.to_dict()
        return render_template('admin_project_details.html', project=project_data)
    else:
        flash('Project not found!', 'error')
        return redirect(url_for('admin.admin_projects'))

@admin_bp.route('/add-admin-project', methods=['POST'])
@login_required
def add_admin_project():
    if request.method == 'POST':
        # Get form data
        title = request.form.get('title')
        price = float(request.form.get('price'))
        domain = request.form.get('domain')
        status = request.form.get('status')
        description = request.form.get('description')
        developer_name = request.form.get('developer_name')
        difficulty_level = request.form.get('difficulty_level')
        technologies = request.form.get('technologies')
        requirements = request.form.get('requirements', '')

        # Handle file uploads
        screenshots_urls = []
        zip_file_url = ''

        if CLOUDINARY_AVAILABLE:
            # Upload to Cloudinary
            # Validate and upload screenshots
            if 'screenshots' in request.files:
                screenshots = request.files.getlist('screenshots')
                for screenshot in screenshots:
                    if screenshot and screenshot.filename:
                        # Check file size (2MB limit for images)
                        if screenshot.content_length > 2 * 1024 * 1024:
                            flash('Screenshot file size too large. Maximum 2MB per image.', 'error')
                            return redirect(url_for('admin.admin_projects'))

                        # Create unique public_id for screenshot
                        public_id = f"admin_{title.replace(' ', '_')}_screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
                        upload_result = cloudinary.uploader.upload(screenshot, public_id=public_id, folder="innovateguide/screenshots")
                        screenshots_urls.append(upload_result['secure_url'])

            # Validate and upload zip file
            if 'zip_file' in request.files:
                zip_file = request.files['zip_file']
                if zip_file and zip_file.filename:
                    # Check file size (10MB limit for free tier)
                    if zip_file.content_length > 10 * 1024 * 1024:
                        flash('Project file size too large. Maximum 10MB.', 'error')
                        return redirect(url_for('admin.admin_projects'))

                    # Create unique public_id for zip file
                    public_id = f"admin_{title.replace(' ', '_')}_project_files_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
                    upload_result = cloudinary.uploader.upload(zip_file, public_id=public_id, folder="innovateguide/projects", resource_type="raw")
                    zip_file_url = upload_result['secure_url']
        else:
            # Cloudinary not available, skip uploads
            flash('File upload service not available. Project created without files.', 'warning')

        # Create new project in database
        new_project = Project(
            title=title,
            description=description,
            price=price,
            domain=domain,
            status=status,
            owner_type='admin',
            developer_name=developer_name,
            difficulty_level=difficulty_level,
            technologies=json.dumps(technologies.split(',')) if technologies else None,
            requirements=requirements,
            screenshots=json.dumps(screenshots_urls) if screenshots_urls else None,
            zip_file=zip_file_url if zip_file_url else None
        )

        db.session.add(new_project)
        db.session.commit()

        flash('Admin project added successfully!', 'success')
        return redirect(url_for('admin.admin_projects'))

@admin_bp.route('/update-admin-project/<int:project_id>', methods=['POST'])
@login_required
def update_admin_project(project_id):
    if request.method == 'POST':
        # Find the project in database
        project = Project.query.filter_by(id=project_id, owner_type='admin').first()

        if project:
            # Update project data
            project.title = request.form.get('title')
            project.price = float(request.form.get('price'))
            project.domain = request.form.get('domain')
            project.project_type = request.form.get('project_type')
            project.status = request.form.get('status')
            project.description = request.form.get('description')
            project.developer_name = request.form.get('developer_name')
            project.difficulty_level = request.form.get('difficulty_level')
            project.technologies = json.dumps(request.form.get('technologies').split(',')) if request.form.get('technologies') else None
            project.phase = request.form.get('phase')
            project.video_tutorial = request.form.get('video_tutorial', '')

            db.session.commit()

            flash('Project updated successfully!', 'success')
            return redirect(url_for('admin.admin_project_details', project_id=project_id))
        else:
            flash('Project not found!', 'error')
            return redirect(url_for('admin.admin_projects'))

@admin_bp.route('/delete-admin-project/<int:project_id>', methods=['DELETE'])
@login_required
def delete_admin_project(project_id):
    project = Project.query.filter_by(id=project_id, owner_type='admin').first()
    if project:
        db.session.delete(project)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Project deleted successfully'})
    return jsonify({'success': False, 'message': 'Project not found'}), 404

@admin_bp.route('/student-projects')
@login_required
def student_projects():
    student_projects = Project.query.filter_by(owner_type='student').all()
    student_projects_data = [project.to_dict() for project in student_projects]
    return render_template('student_project.html', student_projects=student_projects_data)

@admin_bp.route('/student-project-details/<int:project_id>')
@login_required
def student_project_details(project_id):
    # Find the student project from database
    project = Project.query.filter_by(id=project_id, owner_type='student').first()

    if project:
        project_data = project.to_dict()
        # Add additional student information from the database
        project_full = {
            **project_data,
            'mobile': project.student_phone or '+1 (555) 123-4567',
            'college': project.student_college or 'N/A',
            'course': project.student_course or 'N/A',
            'year': project.student_year or 'N/A',
            'difficulty_level': project.difficulty_level or 'Intermediate',
            'project_type': project.project_type or 'Mini Project',
            'video_tutorial': project.video_tutorial or 'https://www.youtube.com/watch?v=example',
            'screenshots': project_data.get('screenshots', ['screenshot1.jpg', 'screenshot2.jpg']),
            'zip_file': project.zip_file or 'student_project_files.zip',
            'technologies': ', '.join(project_data.get('technologies', [])) or 'HTML, CSS, JavaScript, React, Node.js',
            'description': project.description or 'A detailed student project description.'
        }
        return render_template('student_project_details.html', project=project_full)
    else:
        flash('Project not found!', 'error')
        return redirect(url_for('admin.student_projects'))

@admin_bp.route('/delete-student-project/<int:project_id>', methods=['DELETE'])
@login_required
def delete_student_project(project_id):
    project = Project.query.filter_by(id=project_id, owner_type='student').first()
    if project:
        db.session.delete(project)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Student project deleted successfully'})
    return jsonify({'success': False, 'message': 'Project not found'}), 404

@admin_bp.route('/total-projects')
@login_required
def total_projects():
    # Get all projects from database
    all_projects = Project.query.all()
    total_projects_list = []

    for project in all_projects:
        proj_dict = project.to_dict()
        if project.owner_type == 'admin':
            total_projects_list.append({
                'id': project.id,
                'type': 'admin',
                'title': project.title,
                'name': project.developer_name,
                'email': 'admin@innovateguide.com',
                'price': project.price,
                'domain': project.domain,
                'status': project.status,
                'description': project.description
            })
        elif project.owner_type == 'student':
            total_projects_list.append({
                'id': project.id,
                'type': 'student',
                'title': project.title,
                'name': project.student_name,
                'email': project.student_email,
                'price': project.price,
                'domain': project.domain,
                'status': project.status,
                'description': project.description
            })
        elif project.status == 'pending':
            total_projects_list.append({
                'id': project.id,
                'type': 'requested',
                'title': project.title,
                'name': project.student_name or project.developer_name,
                'email': project.student_email,
                'price': project.price,
                'domain': project.domain,
                'status': 'Pending',
                'description': project.description
            })

    admin_count = Project.query.filter_by(owner_type='admin').count()
    student_count = Project.query.filter_by(owner_type='student').count()

    return render_template('total_project.html',
                         total_projects=total_projects_list,
                         total_projects_count=len(total_projects_list),
                         admin_projects_count=admin_count,
                         student_projects_count=student_count)

@admin_bp.route('/search')
@login_required
def search_projects():
    query = request.args.get('q', '')
    if query:
        filtered_projects = Project.query.filter(
            Project.title.contains(query) | Project.description.contains(query)
        ).all()
        filtered_projects_data = [project.to_dict() for project in filtered_projects]
    else:
        filtered_projects_data = []

    stats = {
        "total_projects": Project.query.count(),
        "requested_projects": Project.query.filter_by(status='pending').count(),
        "admin_projects": Project.query.filter_by(owner_type='admin').count(),
        "student_projects": Project.query.filter_by(owner_type='student').count()
    }

    return render_template('dashboard.html',
                         projects=filtered_projects_data,
                         stats=stats,
                         search_query=query)

# Additional utility routes
@admin_bp.route('/approve-project/<int:project_id>')
@login_required
def approve_project(project_id):
    # Find and approve requested project in database
    project = Project.query.filter_by(id=project_id, status='pending').first()
    if project:
        project.status = 'active'
        db.session.commit()
        flash(f'Project "{project.title}" approved successfully!', 'success')
    else:
        flash('Project not found!', 'error')
    return redirect(url_for('admin.requested_projects'))

@admin_bp.route('/update-student-project/<int:project_id>', methods=['POST'])
@login_required
def update_student_project(project_id):
    if request.method == 'POST':
        # Find the student project in database
        project = Project.query.filter_by(id=project_id, owner_type='student').first()

        if project:
            # Update project data
            project.title = request.form.get('title')
            project.price = float(request.form.get('price'))
            project.domain = request.form.get('domain')
            project.project_type = request.form.get('project_type')
            project.status = request.form.get('status')
            project.description = request.form.get('description')
            project.difficulty_level = request.form.get('difficulty_level')
            project.technologies = json.dumps(request.form.get('technologies').split(',')) if request.form.get('technologies') else None
            project.video_tutorial = request.form.get('video_tutorial', '')

            db.session.commit()

            flash('Student project updated successfully!', 'success')
            return redirect(url_for('admin.student_project_details', project_id=project_id))
        else:
            flash('Student project not found!', 'error')
            return redirect(url_for('admin.student_projects'))

@admin_bp.route('/reject-project/<int:project_id>')
@login_required
def reject_project(project_id):
    # Find and reject requested project in database
    project = Project.query.filter_by(id=project_id, status='pending').first()
    if project:
        project.status = 'rejected'
        db.session.commit()
        flash(f'Project "{project.title}" rejected!', 'success')
    else:
        flash('Project not found!', 'error')
    return redirect(url_for('admin.requested_projects'))

@admin_bp.route('/buy-enquiries')
@login_required
def buy_enquiries():
    enquiries = ProjectBuyEnquiry.query.order_by(ProjectBuyEnquiry.created_at.desc()).all()
    enquiries_data = [enquiry.to_dict() for enquiry in enquiries]
    return render_template('buy_enquiries.html', enquiries=enquiries_data)

@admin_bp.route('/view-buy-enquiry/<int:enquiry_id>')
@login_required
def view_buy_enquiry(enquiry_id):
    enquiry = ProjectBuyEnquiry.query.get(enquiry_id)
    if not enquiry:
        flash('Enquiry not found!', 'error')
        return redirect(url_for('admin.buy_enquiries'))

    enquiry_data = enquiry.to_dict()
    project = Project.query.get(enquiry.project_id)
    enquiry_data['project'] = project.to_dict() if project else None

    return render_template('buy_enquiry_details.html', enquiry=enquiry_data)

@admin_bp.route('/fulfill-buy-enquiry/<int:enquiry_id>', methods=['POST'])
@login_required
def fulfill_buy_enquiry(enquiry_id):
    enquiry = ProjectBuyEnquiry.query.get(enquiry_id)
    if enquiry:
        # You can add a fulfilled field to the model if needed
        # For now, just return success
        return jsonify({'success': True, 'message': 'Enquiry marked as fulfilled'})
    return jsonify({'success': False, 'message': 'Enquiry not found'}), 404

@admin_bp.route('/delete-buy-enquiry/<int:enquiry_id>', methods=['DELETE'])
@login_required
def delete_buy_enquiry(enquiry_id):
    enquiry = ProjectBuyEnquiry.query.get(enquiry_id)
    if enquiry:
        db.session.delete(enquiry)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Enquiry deleted successfully'})
    return jsonify({'success': False, 'message': 'Enquiry not found'}), 404

@admin_bp.route('/custom-project-enquiries')
@login_required
def custom_project_enquiries():
    enquiries = CustomProject.query.order_by(CustomProject.submitted_at.desc()).all()
    enquiries_data = [enquiry.to_dict() for enquiry in enquiries]
    return render_template('custom_project_enquiries.html', enquiries=enquiries_data)

@admin_bp.route('/view-custom-project-enquiry/<int:enquiry_id>')
@login_required
def view_custom_project_enquiry(enquiry_id):
    enquiry = CustomProject.query.get(enquiry_id)
    if not enquiry:
        flash('Enquiry not found!', 'error')
        return redirect(url_for('admin.custom_project_enquiries'))

    enquiry_data = enquiry.to_dict()
    return render_template('custom_project_enquiry_details.html', enquiry=enquiry_data)
