import os
from subprocess import Popen

create_files = {
    'nt': 'create_all.bat'
}

p = Popen(create_files[os.name])
p.communicate()