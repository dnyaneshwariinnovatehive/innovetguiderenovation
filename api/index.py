import sys
import os
import shutil

backend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'backend')
sys.path.insert(0, backend_dir)

os.makedirs('/tmp', exist_ok=True)

src_db = os.path.join(backend_dir, 'instance', 'innovateguide.db')
dst_db = '/tmp/innovateguide.db'
if os.path.exists(src_db):
    shutil.copy2(src_db, dst_db)

os.environ['DATABASE_URL'] = 'sqlite:////tmp/innovateguide.db'

from app import create_app

app = create_app()
