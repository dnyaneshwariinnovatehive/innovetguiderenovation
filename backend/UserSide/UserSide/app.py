from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app as app
from flask_mail import Message, Mail
from datetime import datetime
from models import Project, db
import json
import os
from werkzeug.utils import secure_filename

user_bp = Blueprint(
    "user_bp",
    __name__,
    template_folder="templates",
    static_folder="static",
    static_url_path="/static"
)


CATEGORY_MAPPINGS = {
    "web_development": ["Web"],
    "app_development": ["Android"],
    "web_application": ["Web"],
    "data_science": ["Data Science"],
    "aiml": ["AI"],
    "blockchain": ["Blockchain"],
    "cyber_security": ["Security"],
    "cloud_computing": ["Cloud"]
}

# ======================================================
# HELPER FUNCTIONS
# ======================================================

def allowed_file(filename, allowed_extensions):
    """Check if file has allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def save_uploaded_file(file, folder_name, prefix=""):
    """Save uploaded file locally with secure filename"""
    upload_dir = os.path.join(app.static_folder, 'uploads', folder_name)
    os.makedirs(upload_dir, exist_ok=True)

    filename = secure_filename(file.filename)
    name, ext = os.path.splitext(filename)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_%f')
    unique_filename = f"{prefix}_{timestamp}_{name}{ext}" if prefix else f"{timestamp}_{name}{ext}"

    file_path = os.path.join(upload_dir, unique_filename)
    file.save(file_path)

    # Return relative path that can be served by Flask
    return f"/static/uploads/{folder_name}/{unique_filename}"

def filter_projects(projects, categories, project_type, price_range, difficulties):
    filtered = projects.copy()

    # Category filter
    if categories:
        tech_filters = []
        for cat in categories:
            tech_filters.extend(CATEGORY_MAPPINGS.get(cat, []))
        filtered = [p for p in filtered if any(t in p["technology"] for t in tech_filters)]

    # Project type filter
    if project_type == "mini":
        filtered = [p for p in filtered if p["price"] < 40]
    elif project_type == "major":
        filtered = [p for p in filtered if p["price"] >= 40]

    # Price filter
    if price_range == "under_30":
        filtered = [p for p in filtered if p["price"] < 30]
    elif price_range == "30_60":
        filtered = [p for p in filtered if 30 <= p["price"] <= 60]
    elif price_range == "over_60":
        filtered = [p for p in filtered if p["price"] > 60]

    # Difficulty filter
    if difficulties:
        difficulty_map = {
            "beginner": "Beginner",
            "intermediate": "Intermediate",
            "advanced": "Advanced"
        }
        diff_levels = [difficulty_map[d] for d in difficulties]
        filtered = [p for p in filtered if p["difficulty"] in diff_levels]

    return filtered


def sort_projects(projects, sort_by):
    if sort_by == "newest":
        return sorted(projects, key=lambda x: x["date_added"], reverse=True)
    if sort_by == "price-low":
        return sorted(projects, key=lambda x: x["price"])
    if sort_by == "price-high":
        return sorted(projects, key=lambda x: x["price"], reverse=True)

    return sorted(projects, key=lambda x: (-x["popularity"], -x["sales_count"]))


# ======================================================
# ROUTES
# ======================================================

@user_bp.route("/")
def index():
    # Get all active projects from database
    all_projects = Project.query.filter_by(status='active').all()

    # Convert to dict format for compatibility with existing templates
    projects_data = [project.to_dict() for project in all_projects]

    # For now, add some default values for missing fields
    for proj in projects_data:
        proj['technology'] = proj.get('technologies', [])
        proj['difficulty'] = proj.get('difficulty_level', 'Intermediate')
        proj['rating'] = 4  # Default rating
        proj['popularity'] = 80  # Default popularity
        proj['date_added'] = proj.get('created_at', datetime.now()).strftime('%Y-%m-%d') if proj.get('created_at') else datetime.now().strftime('%Y-%m-%d')
        proj['seller'] = proj.get('developer_name', 'Admin')

        # Use first screenshot as project thumbnail, fallback to placeholder
        screenshots = proj.get('screenshots', [])
        if screenshots and isinstance(screenshots, list) and len(screenshots) > 0:
            proj['image'] = screenshots[0]  # Use first uploaded screenshot
        else:
            proj['image'] = "https://via.placeholder.com/300x200?text=" + proj['title'].replace(' ', '+')

        proj['sales_count'] = 10  # Default sales count

    trending = sort_projects(projects_data, "popularity")[:4]
    new_projects = sort_projects(projects_data, "newest")[:4]
    mini_projects = sorted(projects_data, key=lambda x: x["price"])[:4]
    top_selling = sorted(projects_data, key=lambda x: x["sales_count"], reverse=True)[:3]

    categories = [
        "Web Development",
        "Mobile App",
        "Web Application",
        "Data Science",
        "Artificial Intelligence",
        "Blockchain",
        "Cybersecurity",
        "Cloud Computing"
    ]

    return render_template(
        "index.html",
        trending_projects=trending,
        new_projects=new_projects,
        mini_projects=mini_projects,
        top_selling_projects=top_selling,
        categories=categories
    )


@user_bp.route("/browse_all_projects")
def browse_all_projects():
    categories = request.args.getlist("categories")
    project_type = request.args.get("project_type", "")
    price_range = request.args.get("price_range", "")
    difficulties = request.args.getlist("difficulty")
    sort_by = request.args.get("sort", "popularity")

    # Get all active projects from database
    all_projects = Project.query.filter_by(status='active').all()
    projects_data = [project.to_dict() for project in all_projects]

    # Add compatibility fields
    for proj in projects_data:
        proj['technology'] = proj.get('technologies', [])
        proj['difficulty'] = proj.get('difficulty_level', 'Intermediate')
        proj['rating'] = 4
        proj['popularity'] = 80
        proj['date_added'] = proj.get('created_at', datetime.now()).strftime('%Y-%m-%d') if proj.get('created_at') else datetime.now().strftime('%Y-%m-%d')
        proj['seller'] = proj.get('developer_name', 'Admin')

        # Use first screenshot as project thumbnail, fallback to placeholder
        screenshots = proj.get('screenshots', [])
        if screenshots and isinstance(screenshots, list) and len(screenshots) > 0:
            proj['image'] = screenshots[0]  # Use first uploaded screenshot
        else:
            proj['image'] = "https://via.placeholder.com/300x200?text=" + proj['title'].replace(' ', '+')

        proj['sales_count'] = 10

    filtered = filter_projects(projects_data, categories, project_type, price_range, difficulties)
    sorted_projects = sort_projects(filtered, sort_by)

    return render_template("browse_all_projects.html", projects=sorted_projects)


@user_bp.route("/api/filter_projects")
def api_filter_projects():
    categories = request.args.getlist("categories")
    project_type = request.args.get("project_type", "")
    price_range = request.args.get("price_range", "")
    difficulties = request.args.getlist("difficulty")
    sort_by = request.args.get("sort", "popularity")

    # Get all active projects from database
    all_projects = Project.query.filter_by(status='active').all()
    projects_data = [project.to_dict() for project in all_projects]

    # Add compatibility fields
    for proj in projects_data:
        proj['technology'] = proj.get('technologies', [])
        proj['difficulty'] = proj.get('difficulty_level', 'Intermediate')
        proj['rating'] = 4
        proj['popularity'] = 80
        proj['date_added'] = proj.get('created_at', datetime.now()).strftime('%Y-%m-%d') if proj.get('created_at') else datetime.now().strftime('%Y-%m-%d')
        proj['seller'] = proj.get('developer_name', 'Admin')

        # Use first screenshot as project thumbnail, fallback to placeholder
        screenshots = proj.get('screenshots', [])
        if screenshots and isinstance(screenshots, list) and len(screenshots) > 0:
            proj['image'] = screenshots[0]  # Use first uploaded screenshot
        else:
            proj['image'] = "https://via.placeholder.com/300x200?text=" + proj['title'].replace(' ', '+')

        proj['sales_count'] = 10

    filtered = filter_projects(projects_data, categories, project_type, price_range, difficulties)
    sorted_projects = sort_projects(filtered, sort_by)

    category_counts = {
        key: sum(1 for p in projects_data if any(t in p["technology"] for t in techs))
        for key, techs in CATEGORY_MAPPINGS.items()
    }

    return {
        "projects": sorted_projects,
        "total_count": len(sorted_projects),
        "category_counts": category_counts,
        "project_type_counts": {
            "mini": len([p for p in projects_data if p["price"] < 40]),
            "major": len([p for p in projects_data if p["price"] >= 40])
        }
    }


def _enrich_project(proj):
    proj['technology'] = proj.get('technologies', [])
    proj['difficulty'] = proj.get('difficulty_level', 'Intermediate')
    proj['rating'] = 4
    proj['popularity'] = 80
    proj['date_added'] = proj.get('created_at', datetime.now()).strftime('%Y-%m-%d') if proj.get('created_at') else datetime.now().strftime('%Y-%m-%d')
    proj['seller'] = proj.get('developer_name', 'Admin')
    screenshots = proj.get('screenshots', [])
    if screenshots and isinstance(screenshots, list) and len(screenshots) > 0:
        proj['image'] = screenshots[0]
    else:
        proj['image'] = "https://via.placeholder.com/300x200?text=" + proj['title'].replace(' ', '+')
    proj['sales_count'] = 10
    return proj


@user_bp.route("/api/project/<int:project_id>")
def api_project_details(project_id):
    project = Project.query.filter_by(id=project_id, status='active').first()
    if not project:
        return {"error": "Project not found"}, 404
    project_data = _enrich_project(project.to_dict())
    return {"project": project_data}


@user_bp.route("/api/buy_now/<int:project_id>", methods=["POST"])
def api_buy_now(project_id):
    from models import ProjectBuyEnquiry
    project = Project.query.filter_by(id=project_id, status='active').first()
    if not project:
        return {"error": "Project not found"}, 404
    new_enquiry = ProjectBuyEnquiry(
        project_id=project_id,
        full_name=request.form.get('full_name'),
        email=request.form.get('email'),
        mobile=request.form.get('mobile'),
        college=request.form.get('college'),
        branch=request.form.get('branch'),
        year=request.form.get('year'),
        city_state=request.form.get('city_state')
    )
    db.session.add(new_enquiry)
    db.session.commit()
    return {"success": True, "message": "Purchase enquiry submitted successfully"}


@user_bp.route("/api/custom_project_request", methods=["POST"])
def api_custom_project_request():
    from models import CustomProject
    from datetime import datetime
    deadline_str = request.form.get('deadline')
    deadline = datetime.strptime(deadline_str, '%Y-%m-%d').date() if deadline_str else None
    custom_request = CustomProject(
        name=request.form.get('name'),
        email=request.form.get('email'),
        project_type=request.form.get('project_type'),
        budget=request.form.get('budget'),
        technologies=request.form.get('technologies'),
        deadline=deadline,
        description=request.form.get('description'),
        additional_info=request.form.get('additional_info')
    )
    db.session.add(custom_request)
    db.session.commit()
    return {"success": True, "message": "Custom project request submitted successfully"}


@user_bp.route("/api/sell_your_project", methods=["POST"])
def api_sell_your_project():
    from models import CustomProjectSubmission
    student_name = request.form.get('student_name')
    project_title = request.form.get('project_title')
    screenshots_paths = []
    zip_file_path = ''
    screenshots = request.files.getlist('screenshots')
    allowed_image_exts = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    for idx, screenshot in enumerate(screenshots):
        if screenshot and screenshot.filename:
            if not allowed_file(screenshot.filename, allowed_image_exts):
                return {"error": "Invalid screenshot file type"}, 400
            prefix = f"student_{student_name.replace(' ', '_')}_{project_title.replace(' ', '_')}_screenshot_{idx}"
            saved_path = save_uploaded_file(screenshot, 'student_screenshots', prefix)
            if saved_path:
                screenshots_paths.append(saved_path)
    zip_file = request.files.get('zip_file')
    if zip_file and zip_file.filename:
        allowed_zip_exts = {'zip', 'rar', '7z', 'tar', 'gz'}
        if not allowed_file(zip_file.filename, allowed_zip_exts):
            return {"error": "Invalid project file type"}, 400
        prefix = f"student_{student_name.replace(' ', '_')}_{project_title.replace(' ', '_')}_project_files"
        zip_file_path = save_uploaded_file(zip_file, 'student_projects', prefix)
    submission = CustomProjectSubmission(
        student_name=student_name,
        email=request.form.get('email'),
        mobile=request.form.get('mobile'),
        college_name=request.form.get('college_name'),
        course=request.form.get('course'),
        year=request.form.get('year'),
        project_title=project_title,
        developer=request.form.get('developer'),
        difficulty=request.form.get('difficulty'),
        price=float(request.form.get('price', 0)),
        domain=request.form.get('domain'),
        description=request.form.get('description'),
        technologies=json.dumps(request.form.get('technologies').split(',')) if request.form.get('technologies') else None,
        video_url=request.form.get('video_url'),
        github_url=request.form.get('github_url'),
        requirements=request.form.get('requirements'),
        instructions=request.form.get('instructions'),
        screenshots=json.dumps(screenshots_paths) if screenshots_paths else None,
        zip_file=zip_file_path if zip_file_path else None
    )
    db.session.add(submission)
    project_entry = Project(
        title=project_title,
        description=request.form.get('description'),
        price=float(request.form.get('price', 0)),
        domain=request.form.get('domain'),
        project_type='mini' if float(request.form.get('price', 0)) < 1000 else 'major',
        difficulty_level=request.form.get('difficulty'),
        status='pending',
        owner_type='student',
        developer_name=request.form.get('developer'),
        student_name=student_name,
        student_email=request.form.get('email'),
        student_phone=request.form.get('mobile'),
        student_college=request.form.get('college_name'),
        student_course=request.form.get('course'),
        student_year=request.form.get('year'),
        technologies=json.dumps(request.form.get('technologies').split(',')) if request.form.get('technologies') else None,
        video_tutorial=request.form.get('video_url'),
        requirements=request.form.get('requirements'),
        screenshots=json.dumps(screenshots_paths) if screenshots_paths else None,
        zip_file=zip_file_path if zip_file_path else None
    )
    db.session.add(project_entry)
    db.session.commit()
    return {"success": True, "message": "Project submitted successfully"}


@user_bp.route("/project/<int:project_id>")
def project_details(project_id):
    project = Project.query.filter_by(id=project_id, status='active').first()
    if not project:
        flash("Project not found.", "error")
        return redirect(url_for("user_bp.index"))

    # Convert to dict and add compatibility fields
    project_data = project.to_dict()
    project_data['technology'] = project_data.get('technologies', [])
    project_data['difficulty'] = project_data.get('difficulty_level', 'Intermediate')
    project_data['rating'] = 4
    project_data['popularity'] = 80
    project_data['date_added'] = project_data.get('created_at', datetime.now()).strftime('%Y-%m-%d') if project_data.get('created_at') else datetime.now().strftime('%Y-%m-%d')
    project_data['seller'] = project_data.get('developer_name', 'Admin')

    # Use first screenshot as project thumbnail, fallback to placeholder
    screenshots = project_data.get('screenshots', [])
    if screenshots and isinstance(screenshots, list) and len(screenshots) > 0:
        project_data['image'] = screenshots[0]  # Use first uploaded screenshot
    else:
        project_data['image'] = "https://via.placeholder.com/300x200?text=" + project_data['title'].replace(' ', '+')

    project_data['sales_count'] = 10

    return render_template("project_details.html", project=project_data)


@user_bp.route("/search")
def search():
    query = request.args.get("q", "").lower()

    # Search in database
    all_projects = Project.query.filter_by(status='active').all()
    results = []

    for project in all_projects:
        proj_dict = project.to_dict()
        technologies = proj_dict.get('technologies', [])

        if (query in project.title.lower() or
            query in (project.description or '').lower() or
            any(query in tech.lower() for tech in technologies)):

            # Add compatibility fields
            proj_dict['technology'] = technologies
            proj_dict['difficulty'] = proj_dict.get('difficulty_level', 'Intermediate')
            proj_dict['rating'] = 4
            proj_dict['popularity'] = 80
            proj_dict['date_added'] = proj_dict.get('created_at', datetime.now()).strftime('%Y-%m-%d') if proj_dict.get('created_at') else datetime.now().strftime('%Y-%m-%d')
            proj_dict['seller'] = proj_dict.get('developer_name', 'Admin')

            # Use first screenshot as project thumbnail, fallback to placeholder
            screenshots = proj_dict.get('screenshots', [])
            if screenshots and isinstance(screenshots, list) and len(screenshots) > 0:
                proj_dict['image'] = screenshots[0]  # Use first uploaded screenshot
            else:
                proj_dict['image'] = "https://via.placeholder.com/300x200?text=" + proj_dict['title'].replace(' ', '+')

            proj_dict['sales_count'] = 10

            results.append(proj_dict)

    return render_template("browse_all_projects.html", projects=results)


@user_bp.route("/sell_your_project", methods=["GET", "POST"])
def sell_your_project():
    if request.method == "POST":
        from models import CustomProjectSubmission

        # Get form data
        student_name = request.form.get('student_name')
        email = request.form.get('email')
        mobile = request.form.get('mobile')
        college_name = request.form.get('college_name')
        course = request.form.get('course')
        year = request.form.get('year')

        project_title = request.form.get('project_title')
        developer = request.form.get('developer')
        difficulty = request.form.get('difficulty')
        price = float(request.form.get('price', 0))
        domain = request.form.get('domain')
        description = request.form.get('description')
        technologies = request.form.get('technologies')
        video_url = request.form.get('video_url')
        github_url = request.form.get('github_url')
        requirements = request.form.get('requirements')
        instructions = request.form.get('instructions')

        # Handle file uploads locally
        screenshots_paths = []
        zip_file_path = ''

        # Validate and save screenshots
        screenshots = request.files.getlist('screenshots')
        allowed_image_exts = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

        for idx, screenshot in enumerate(screenshots):
            if screenshot and screenshot.filename:
                # Check file extension
                if not allowed_file(screenshot.filename, allowed_image_exts):
                    flash('Invalid screenshot file type. Allowed: PNG, JPG, JPEG, GIF, WebP.', 'error')
                    return redirect(url_for('user_bp.sell_your_project'))

                # Check file size (2MB limit for images)
                if hasattr(screenshot, 'content_length') and screenshot.content_length > 2 * 1024 * 1024:
                    flash('Screenshot file size too large. Maximum 2MB per image.', 'error')
                    return redirect(url_for('user_bp.sell_your_project'))

                # Save file locally
                prefix = f"student_{student_name.replace(' ', '_')}_{project_title.replace(' ', '_')}_screenshot_{idx}"
                saved_path = save_uploaded_file(screenshot, 'student_screenshots', prefix)
                if saved_path:
                    screenshots_paths.append(saved_path)

        # Validate and save zip file
        zip_file = request.files.get('zip_file')
        if zip_file and zip_file.filename:
            # Check file extension
            allowed_zip_exts = {'zip', 'rar', '7z', 'tar', 'gz'}
            if not allowed_file(zip_file.filename, allowed_zip_exts):
                flash('Invalid project file type. Allowed: ZIP, RAR, 7Z, TAR, GZ.', 'error')
                return redirect(url_for('user_bp.sell_your_project'))

            # Check file size (10MB limit)
            if hasattr(zip_file, 'content_length') and zip_file.content_length > 10 * 1024 * 1024:
                flash('Project file size too large. Maximum 10MB.', 'error')
                return redirect(url_for('user_bp.sell_your_project'))

            # Save file locally
            prefix = f"student_{student_name.replace(' ', '_')}_{project_title.replace(' ', '_')}_project_files"
            zip_file_path = save_uploaded_file(zip_file, 'student_projects', prefix)

        # Create submission record
        submission = CustomProjectSubmission(
            student_name=student_name,
            email=email,
            mobile=mobile,
            college_name=college_name,
            course=course,
            year=year,
            project_title=project_title,
            developer=developer,
            difficulty=difficulty,
            price=price,
            domain=domain,
            description=description,
            technologies=json.dumps(technologies.split(',')) if technologies else None,
            video_url=video_url,
            github_url=github_url,
            requirements=requirements,
            instructions=instructions,
            screenshots=json.dumps(screenshots_paths) if screenshots_paths else None,
            zip_file=zip_file_path if zip_file_path else None
        )

        db.session.add(submission)

        # Also create a Project entry for admin approval
        project_entry = Project(
            title=project_title,
            description=description,
            price=price,
            domain=domain,
            project_type='mini' if price < 1000 else 'major',  # Assuming mini if <1000
            difficulty_level=difficulty,
            status='pending',  # Pending admin approval
            owner_type='student',
            developer_name=developer,
            student_name=student_name,
            student_email=email,
            student_phone=mobile,
            student_college=college_name,
            student_course=course,
            student_year=year,
            technologies=json.dumps(technologies.split(',')) if technologies else None,
            video_tutorial=video_url,
            requirements=requirements,
            screenshots=json.dumps(screenshots_paths) if screenshots_paths else None,
            zip_file=zip_file_path if zip_file_path else None
        )

        db.session.add(project_entry)
        db.session.commit()

        flash("Your project has been submitted successfully! We will review it and contact you soon.", "success")
        return redirect(url_for("user_bp.sell_your_project"))
    return render_template("sell_your_project.html")


@user_bp.route("/custom_project_request", methods=["POST"])
def custom_project_request():
    from models import CustomProject

    # Get form data
    name = request.form.get('name')
    email = request.form.get('email')
    project_type = request.form.get('project_type')
    budget = request.form.get('budget')
    technologies = request.form.get('technologies')
    deadline_str = request.form.get('deadline')
    description = request.form.get('description')
    additional_info = request.form.get('additional_info')

    # Convert deadline string to date
    from datetime import datetime
    deadline = datetime.strptime(deadline_str, '%Y-%m-%d').date() if deadline_str else None

    # Create custom project request
    custom_request = CustomProject(
        name=name,
        email=email,
        project_type=project_type,
        budget=budget,
        technologies=technologies,
        deadline=deadline,
        description=description,
        additional_info=additional_info
    )

    db.session.add(custom_request)
    db.session.commit()

    flash("Your custom project request has been submitted! We will contact you soon.", "success")
    return redirect(url_for("user_bp.index"))

@user_bp.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy_policy.html')

@user_bp.route('/terms-of-service')
def terms_of_service():
    return render_template('terms_of_service.html')

@user_bp.route('/about')
def about():
    return render_template('about.html')
@user_bp.route('/how-it-works')
def how_it_works():
    return render_template('how_it_works.html')

@user_bp.route('/faq')
def faq():
    return render_template('faq.html')

@user_bp.route('/contact')
def contact():
    return render_template('contact.html')

@user_bp.route('/buy_now/<int:project_id>')
def buy_now(project_id):
    # Get project details for display
    project = Project.query.filter_by(id=project_id, status='active').first()
    if not project:
        flash("Project not found.", "error")
        return redirect(url_for("user_bp.index"))

    project_data = project.to_dict()
    project_data['technology'] = project_data.get('technologies', [])
    project_data['difficulty'] = project_data.get('difficulty_level', 'Intermediate')
    project_data['rating'] = 4
    project_data['popularity'] = 80
    project_data['date_added'] = project_data.get('created_at', datetime.now()).strftime('%Y-%m-%d') if project_data.get('created_at') else datetime.now().strftime('%Y-%m-%d')
    project_data['seller'] = project_data.get('developer_name', 'Admin')

    # Use first screenshot as project thumbnail, fallback to placeholder
    screenshots = project_data.get('screenshots', [])
    if screenshots and isinstance(screenshots, list) and len(screenshots) > 0:
        project_data['image'] = screenshots[0]  # Use first uploaded screenshot
    else:
        project_data['image'] = "https://via.placeholder.com/300x200?text=" + project_data['title'].replace(' ', '+')

    project_data['sales_count'] = 10

    return render_template('buy_now.html', project=project_data)

@user_bp.route('/buy_now/<int:project_id>', methods=['POST'])
def submit_buy_now(project_id):
    if request.method == 'POST':
        # Get form data
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        mobile = request.form.get('mobile')
        college = request.form.get('college')
        branch = request.form.get('branch')
        year = request.form.get('year')
        city_state = request.form.get('city_state')

        # Create new enquiry
        from models import ProjectBuyEnquiry
        new_enquiry = ProjectBuyEnquiry(
            project_id=project_id,
            full_name=full_name,
            email=email,
            mobile=mobile,
            college=college,
            branch=branch,
            year=year,
            city_state=city_state
        )

        db.session.add(new_enquiry)
        db.session.commit()

        # Send email notification
        try:
            mail = Mail(app)
            msg = Message(
                subject='New Project Purchase Enquiry',
                recipients=['innovateguidee@gmail.com'],
                body=f"""
New purchase enquiry received:

Project ID: {project_id}
Project Title: {project.title}
Buyer Details:
- Name: {full_name}
- Email: {email}
- Mobile: {mobile}
- College: {college}
- Branch: {branch}
- Year: {year}
- City/State: {city_state}

Enquiry submitted at: {new_enquiry.created_at}
                """
            )
            mail.send(msg)
        except Exception as e:
            # Email sending failed, but don't fail the request
            pass

        flash('Your purchase enquiry has been submitted successfully! We will contact you soon.', 'success')
        return redirect(url_for('user_bp.buy_now', project_id=project_id))



# ======================================================
# APP RUN
# ======================================================

