import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ['FLASK_ENV'] = 'production'
os.environ['DATABASE_URL'] = 'sqlite:////tmp/innovateguide.db'

from app import create_app

app = create_app('production')

handler = app
