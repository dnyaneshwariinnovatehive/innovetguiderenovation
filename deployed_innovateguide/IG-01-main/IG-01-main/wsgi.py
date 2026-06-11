#!/usr/bin/env python3
"""
WSGI entry point for production deployment
"""
import logging
import sys
import os

# Set up logging to file
log_file = os.path.join(os.path.dirname(__file__), 'app.log')
logging.basicConfig(
    level=logging.DEBUG,
    filename=log_file,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

try:
    from app import create_app
    # Create application instance
    application = create_app()
    logging.info("Application created successfully")
except Exception as e:
    logging.error(f"Error creating application: {e}", exc_info=True)
    raise