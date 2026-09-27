"""
Fixes [YOUR DOMAIN] and [YOUR BRAND] and broken srcset attributes across all HTML files.
"""
import os
import re

SITE_DIR = r"c:\My Web Sites\VapeCulture\vapeculture.in"

html_files = []
for root, dirs, files in os.walk(SITE_DIR):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

print(f"Found {len(html_files)} HTML files to process.")

count = 0
for fpath in html_files:
    try:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        modified = False
        if '[YOUR BRAND]' in content:
            content = content.replace('[YOUR BRAND]', 'VapeCultureKE')
            modified = True

        if '[YOUR DOMAIN]' in content:
            # Remove srcset that points to //[YOUR DOMAIN]... so browser uses valid local src attribute
            content = re.sub(r'srcset=["\'][^"\']*\[YOUR DOMAIN\][^"\']*["\']', '', content)
            content = content.replace('[YOUR DOMAIN]', 'vapecultureke.com')
            modified = True

        if modified:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
    except Exception as e:
        print(f"Error processing {fpath}: {e}")

print(f"Successfully processed {count} HTML files.")
