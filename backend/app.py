import os
import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from AdminSide.app import admin_bp
from UserSide.UserSide.app import user_bp
from models import db
from config import get_config

def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(
        __name__,
        static_folder="UserSide/UserSide/static",
        static_url_path="/static"
    )

    # Load configuration
    config_class = get_config(config_name)
    app.config.from_object(config_class)

    # Configure logging
    if not app.debug:
        # Production logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('app.log'),
                logging.StreamHandler()
            ]
        )
    else:
        # Development logging
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )

    # Security headers
    @app.after_request
    def add_security_headers(response):
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'SAMEORIGIN'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        if app.config['SESSION_COOKIE_SECURE']:
            response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        return response

    # Error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        app.logger.warning(f'404 error: {request.url}')
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f'500 error: {str(error)}')
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500

    @app.errorhandler(Exception)
    def handle_exception(error):
        app.logger.error(f'Unhandled exception: {str(error)}')
        return jsonify({'error': 'An unexpected error occurred'}), 500

    # Initialize extensions
    db.init_app(app)
    mail = Mail(app)

    # Create database tables
    with app.app_context():
        db.create_all()

    # Register blueprints
    app.register_blueprint(user_bp, url_prefix='/')
    app.register_blueprint(admin_bp, url_prefix='/admin')

    # Health check endpoint
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'environment': os.environ.get('FLASK_ENV', 'development')}

    app.logger.info(f'Application started in {config_class.__name__} mode')

    return app

# For development
if __name__ == '__main__':
    app = create_app()
    app.run(
        host=os.environ.get('HOST', '0.0.0.0'),
        port=int(os.environ.get('PORT', 5001)),
        debug=app.config['DEBUG']
    )