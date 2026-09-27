import os
import re

# Configuration
SIDEBAR_BRAND = "VAPECULTURE"
PROJECT_ROOT = r"c:\My Web Sites\VapeCulture\vapeculture.in"

# Sidebar HTML Template
SIDEBAR_HTML = """
    <!-- Custom Sidebar Integration Start -->
    <div id="sidebar-overlay"></div>
    
    <button id="sidebar-toggle" aria-label="Open Menu" title="Open Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>

    <div id="custom-sidebar">
        <div class="sidebar-header">
            <span class="sidebar-brand">{brand}</span>
            <button id="close-sidebar" aria-label="Close Menu" title="Close Menu">&times;</button>
        </div>
        <nav class="sidebar-nav">
            <ul>
                <li><a href="{root}index.html">Home</a></li>
                <li><a href="{root}collections/all.html">Catalog</a></li>
                <li><a href="{root}collections/disposable-vapes.html">Disposable Vapes</a></li>
                <li><a href="{root}collections/vape-kenya.html">Starter Kits/ Devices</a></li>
                <li><a href="{root}collections/iqos-heets.html">IQOS</a></li>
                <li><a href="{root}collections/vape-kenya.html">Vape</a></li>
                <li><a href="{root}collections/nic-salts.html">NIC Salts</a></li>
                <li><a href="{root}collections/vape-liquid.html">E Liquid</a></li>
                <li><a href="{root}collections/nicotine-pouches-kenya.html">Nicotine Pouches</a></li>
            </ul>
        </nav>
        <div class="sidebar-footer">
            <p>&copy; 2026 {brand}</p>
        </div>
    </div>
    <!-- Custom Sidebar Integration End -->
"""

def inject_sidebar(file_path):
    content = None
    encoding = 'utf-8'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        encoding = 'latin-1'
        try:
            with open(file_path, 'r', encoding='latin-1') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return

    # Remove old sidebar integration if exists
    content = re.sub(r'<!-- Custom Sidebar Integration Start -->.*?<!-- Custom Sidebar Integration End -->', '', content, flags=re.DOTALL)
    # Also handle the old style if it was injected without comments
    if 'id="custom-sidebar"' in content and 'Custom Sidebar Integration Start' not in content:
        # Fallback for the very first injection which didn't have comments
        content = re.sub(r'<div id="sidebar-overlay">.*?<script src=".*?sidebar\.js"></script>', '', content, flags=re.DOTALL)

    # Calculate relative path to root
    rel_depth = os.path.relpath(PROJECT_ROOT, os.path.dirname(file_path))
    if rel_depth == ".":
        root_prefix = ""
    else:
        root_prefix = rel_depth.replace("\\", "/") + "/"

    # Format Sidebar HTML
    formatted_sidebar = SIDEBAR_HTML.format(brand=SIDEBAR_BRAND, root=root_prefix)

    # Inject CSS in <head> if not already there
    css_link = f'<link rel="stylesheet" href="{root_prefix}sidebar.css">'
    if css_link not in content:
        if "</head>" in content:
            content = content.replace("</head>", f"{css_link}\n</head>")
    
    # Inject Sidebar and JS before </body>
    js_script = f'<script src="{root_prefix}sidebar.js"></script>'
    full_injection = f"{formatted_sidebar}\n{js_script}\n"
    
    if "</body>" in content:
        content = content.replace("</body>", f"{full_injection}</body>")
    
    try:
        with open(file_path, 'w', encoding=encoding) as f:
            f.write(content)
        print(f"Updated sidebar in {file_path}")
    except Exception as e:
        print(f"Error writing {file_path}: {e}")

def main():
    for root, dirs, files in os.walk(PROJECT_ROOT):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                if "GET.html" in file or "POST.html" in file:
                    continue
                inject_sidebar(file_path)

if __name__ == "__main__":
    main()
