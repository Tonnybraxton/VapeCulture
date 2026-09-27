"""
Local Development Server for VapeCulture Kenya Storefront.
Serves static assets with clean routing, correct MIME types, and fast response times.
"""
import http.server
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_DIR = os.path.join(BASE_DIR, "vapeculture.in")
PORT = 8080

class VapeCultureHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SITE_DIR, **kwargs)

    def do_GET(self):
        # Serve index.html cleanly on root
        if self.path in ('/', ''):
            self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        # Filter out repetitive external 404 noise to keep logs clean
        if args and len(args) > 1 and '404' in str(args[1]):
            return
        super().log_message(format, *args)

def run():
    with http.server.HTTPServer(("", PORT), VapeCultureHandler) as httpd:
        print("=" * 60)
        print(f"  🌿 VapeCulture Storefront running at: http://localhost:{PORT}")
        print(f"  📂 Serving from: {SITE_DIR}")
        print("=" * 60)
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == '__main__':
    run()
