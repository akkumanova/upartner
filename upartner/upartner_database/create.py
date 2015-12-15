#!/usr/bin/python

import os
import sys
from subprocess import Popen

create_files = {
    'nt': 'create_all.bat',
    'posix': 'create_all.sh'
}

file = create_files.get(os.name, None)
if file is None:
    sys.exit('Unsupported os. Switch to Linux or Windows.')

p = Popen(file)
p.communicate()