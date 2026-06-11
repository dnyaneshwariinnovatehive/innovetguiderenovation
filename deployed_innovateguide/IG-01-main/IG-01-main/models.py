from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    college = db.Column(db.String(200))
    course = db.Column(db.String(100))
    year = db.Column(db.String(20))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Convert model to dictionary for easy use in templates"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'college': self.college,
            'course': self.course,
            'year': self.year,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    domain = db.Column(db.String(100))
    project_type = db.Column(db.String(20), default='mini')  # mini/major
    difficulty_level = db.Column(db.String(20), default='intermediate')
    status = db.Column(db.String(20), default='active')
    phase = db.Column(db.String(50), default='planning')

    # Ownership
    owner_type = db.Column(db.String(20), default='admin')  # admin/student/external
    developer_name = db.Column(db.String(100))
    student_name = db.Column(db.String(100))
    student_email = db.Column(db.String(120))
    student_phone = db.Column(db.String(20))
    student_college = db.Column(db.String(200))
    student_course = db.Column(db.String(100))
    student_year = db.Column(db.String(20))

    # Technical
    technologies = db.Column(db.Text)  # JSON string
    video_tutorial = db.Column(db.String(500))
    requirements = db.Column(db.Text)

    # Files
    screenshots = db.Column(db.Text)  # JSON string of paths
    zip_file = db.Column(db.String(500))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Convert model to dictionary for easy use in templates"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'domain': self.domain,
            'project_type': self.project_type,
            'difficulty_level': self.difficulty_level,
            'status': self.status,
            'owner_type': self.owner_type,
            'developer_name': self.developer_name,
            'student_name': self.student_name,
            'student_email': self.student_email,
            'student_phone': self.student_phone,
            'student_college': self.student_college,
            'student_course': self.student_course,
            'student_year': self.student_year,
            'technologies': json.loads(self.technologies) if self.technologies else [],
            'video_tutorial': self.video_tutorial,
            'requirements': self.requirements,
            'screenshots': json.loads(self.screenshots) if self.screenshots else [],
            'zip_file': self.zip_file,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


class CustomProject(db.Model):
   __tablename__ = 'custom_project'

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(100), nullable=False)
   email = db.Column(db.String(120), nullable=False)
   project_type = db.Column(db.String(50), nullable=False)
   budget = db.Column(db.String(50), nullable=False)
   technologies = db.Column(db.Text)
   deadline = db.Column(db.Date, nullable=False)
   description = db.Column(db.Text, nullable=False)
   additional_info = db.Column(db.Text)

   submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

   def to_dict(self):
       return {
           'id': self.id,
           'name': self.name,
           'email': self.email,
           'project_type': self.project_type,
           'budget': self.budget,
           'technologies': self.technologies,
           'deadline': self.deadline,
           'description': self.description,
           'additional_info': self.additional_info,
           'submitted_at': self.submitted_at
       }


class ProjectBuyEnquiry(db.Model):
       id = db.Column(db.Integer, primary_key=True)
       project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
       full_name = db.Column(db.String(100), nullable=False)
       email = db.Column(db.String(120), nullable=False)
       mobile = db.Column(db.String(20), nullable=False)
       college = db.Column(db.String(200), nullable=False)
       branch = db.Column(db.String(100), nullable=False)
       year = db.Column(db.String(50), nullable=False)
       city_state = db.Column(db.String(200))
   
       created_at = db.Column(db.DateTime, default=datetime.utcnow)
   
       # Relationship to project
       project = db.relationship('Project', backref='buy_enquiries')
   
       def to_dict(self):
           return {
               'id': self.id,
               'project_id': self.project_id,
               'project_title': self.project.title if self.project else 'N/A',
               'full_name': self.full_name,
               'email': self.email,
               'mobile': self.mobile,
               'college': self.college,
               'branch': self.branch,
               'year': self.year,
               'city_state': self.city_state,
               'created_at': self.created_at
           }


class CustomProjectSubmission(db.Model):
    __tablename__ = 'sell_project_student'

    id = db.Column(db.Integer, primary_key=True)

    # Student Details
    student_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    mobile = db.Column(db.String(20), nullable=False)
    college_name = db.Column(db.String(200), nullable=False)
    course = db.Column(db.String(100), nullable=False)
    year = db.Column(db.String(50), nullable=False)

    # Project Details
    project_title = db.Column(db.String(200), nullable=False)
    developer = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Float, nullable=False)
    domain = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    technologies = db.Column(db.Text, nullable=False)  # JSON string
    video_url = db.Column(db.String(500), nullable=False)
    github_url = db.Column(db.String(500), nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)

    # Files (store paths after upload)
    screenshots = db.Column(db.Text)  # JSON string of file paths
    zip_file = db.Column(db.String(500))

    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
           return {
               'id': self.id,
               'student_name': self.student_name,
               'email': self.email,
               'mobile': self.mobile,
               'college_name': self.college_name,
               'course': self.course,
               'year': self.year,
               'project_title': self.project_title,
               'developer': self.developer,
               'difficulty': self.difficulty,
               'price': self.price,
               'domain': self.domain,
               'description': self.description,
               'technologies': json.loads(self.technologies) if self.technologies else [],
               'video_url': self.video_url,
               'github_url': self.github_url,
               'requirements': self.requirements,
               'instructions': self.instructions,
               'screenshots': json.loads(self.screenshots) if self.screenshots else [],
               'zip_file': self.zip_file,
               'status': self.status,
               'submitted_at': self.submitted_at
           }