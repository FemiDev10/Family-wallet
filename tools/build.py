#!/usr/bin/env python3
"""Regenerate dashboard.html and index.html from their artifact sources.

control-centre.html and demo.html have no <html>/<head> wrapper, so they can be
hosted as claude.ai artifacts. Run this after editing either one:

    python3 tools/build.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HEAD = ('<!doctype html>\n<html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">\n')

def wrap(src, dst):
    s = (ROOT / src).read_text()
    i = s.index('</style>') + len('</style>')
    (ROOT / dst).write_text(HEAD + s[:i] + '\n</head><body>\n' + s[i:] + '\n</body></html>\n')
    print(f'{src} -> {dst}')

wrap('control-centre.html', 'dashboard.html')
wrap('demo.html', 'index.html')
