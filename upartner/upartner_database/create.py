#!/usr/bin/python

import os
import sys
from subprocess import Popen

create_files = {
    'win32': 'create_all.bat',
    'linux2': 'create_all.sh'
}

file = create_files.get(os.platform, None)
if file is None:
    sys.exit('Unsupported os. Switch to Linux or Windows.')

p = Popen(file)
p.communicate()