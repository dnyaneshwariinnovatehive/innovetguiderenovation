import os
from pathlib import Path

print('__file__:', repr(__file__))
print('abspath:', repr(os.path.abspath(__file__)))
print('dirname:', repr(os.path.dirname(os.path.abspath(__file__))))

instance_path = Path(os.path.dirname(os.path.abspath(__file__))) / 'instance'
print('instance_path:', instance_path)
db_path = instance_path / 'innovateguide.db'
print('db_path:', db_path)
print('as_posix:', db_path.as_posix())
print('URI:', f'sqlite:///{db_path.as_posix()}')
