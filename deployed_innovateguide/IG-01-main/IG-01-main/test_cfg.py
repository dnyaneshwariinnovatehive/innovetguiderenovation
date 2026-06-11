import os
import sys
sys.path.insert(0, '.')
from config import get_config

cfg = get_config('development')
print('URI:', cfg.SQLALCHEMY_DATABASE_URI)
