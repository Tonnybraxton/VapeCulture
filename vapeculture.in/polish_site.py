from __future__ import annotations

import os
import re
import tempfile
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SKIP_PARTS = {'.git', 'a'}


def root_prefix(path: Path) -> str:
    depth = len(path.relative_to(ROOT).parent.parts)
    return '../' * depth


def atomic_write(path: Path, content: str) -> None:
    fd, temporary_name = tempfile.mkstemp(prefix=path.name + '.', suffix='.tmp', dir=path.parent)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8', newline='') as stream:
            stream.write(content)
        for attempt in range(20):
            try:
                os.replace(temporary_name, path)
                break
            except PermissionError:
                if attempt == 19:
                    raise
                time.sleep(0.1)
    except Exception:
        try:
            os.unlink(temporary_name)
        except FileNotFoundError:
            pass
        raise


def clean_page(path: Path) -> bool:
    raw = path.read_bytes()
    if not raw or b'<html' not in raw.lower():
        return False

    text = raw.decode('utf-8-sig', errors='replace')
    original_text = text
    prefix = root_prefix(path)

    text = re.sub(r'<!--\s*Mirrored from .*?-->', '', text, flags=re.I | re.S)
    text = re.sub(r'<!--\s*Added by HTTrack\s*-->.*?<!--\s*/Added by HTTrack\s*-->', '', text, flags=re.I | re.S)
    text = re.sub(r'<!--\s*Custom Sidebar Integration Start\s*-->.*?<!--\s*Custom Sidebar Integration End\s*-->', '', text, flags=re.I | re.S)
    text = re.sub(r'<!--\s*Custom Sidebar Integration\s*-->', '', text, flags=re.I)
    text = re.sub(r'\s*<script\b[^>]*src=["\'][^"\']*sidebar\.js[^"\']*["\'][^>]*>\s*</script>', '', text, flags=re.I)
    text = re.sub(r'\s*<link\b[^>]*href=["\'][^"\']*sidebar\.css[^"\']*["\'][^>]*>', '', text, flags=re.I)

    text = re.sub(
        r'\s+srcset=["\'][^"\']*(?:\[YOUR DOMAIN\]|vapecultureke\.com|your-store-kenya\.myshopify\.com)[^"\']*["\']',
        '',
        text,
        flags=re.I,
    )

    text = text.replace('[YOUR BRAND]', 'VapeCultureKE')
    text = text.replace('vapekenya logo', 'VapeCultureKE logo')
    text = text.replace('Vape Kenya logo', 'VapeCultureKE logo')
    text = text.replace('new_logo.png', 'vapecultureke-logo.png')
    text = re.sub(r'support@(?:%5B)?\[YOUR DOMAIN\](?:%5D)?', 'hello@vapecultureke.local', text, flags=re.I)

    text = re.sub(
        r'<a\b[^>]*href=["\'][^"\']*shopify\.com/\?utm_campaign=poweredby[^"\']*["\'][^>]*>.*?</a>',
        '',
        text,
        flags=re.I | re.S,
    )

    text = re.sub(r'\s*<link\b[^>]*href=["\'][^"\']*dark-theme\.css[^"\']*["\'][^>]*>', '', text, flags=re.I)
    text = re.sub(r'\s*<script\b[^>]*src=["\'][^"\']*site-ui\.js[^"\']*["\'][^>]*>\s*</script>', '', text, flags=re.I)
    theme = f'\n<link rel="stylesheet" href="{prefix}dark-theme.css?v=5">\n'
    helper = f'\n<script src="{prefix}site-ui.js?v=5" defer></script>\n'
    text = re.sub(r'</head>', theme + '</head>', text, count=1, flags=re.I)
    text = re.sub(r'</body>', helper + '</body>', text, count=1, flags=re.I)

    if text != original_text:
        atomic_write(path, text)
    return True


def main() -> None:
    updated = 0
    skipped = 0
    for path in ROOT.rglob('*.html'):
        if any(part in SKIP_PARTS for part in path.relative_to(ROOT).parts):
            skipped += 1
            continue
        if clean_page(path):
            updated += 1
        else:
            skipped += 1
    print(f'Updated {updated} HTML pages; skipped {skipped} empty or non-page files.')


if __name__ == '__main__':
    main()
