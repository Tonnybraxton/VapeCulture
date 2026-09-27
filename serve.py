"""
Local Development Server for VapeCulture Kenya Storefront.
Serves static assets and routes the storefront to the authentic Shopify collections page.
"""
import http.server
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_DIR = os.path.join(BASE_DIR, "vapeculture.in")
PORT = 8080

class VapeCultureHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SITE_DIR, **kwargs)

    def do_GET(self):
        # Redirect root to authentic Shopify collection storefront
        if self.path in ('/', '/index.html', ''):
            self.send_response(302)
            self.send_header('Location', '/collections/all.html')
            self.end_headers()
            return
        return super().do_GET()

    def log_message(self, format, *args):
        # Suppress 404 logs for external assets to keep terminal output clean
        if args and len(args) > 1 and '404' in str(args[1]):
            return
        super().log_message(format, *args)

def run():
    with http.server.HTTPServer(("", PORT), VapeCultureHandler) as httpd:
        print("=" * 60)
        print(f"  VapeCulture Storefront running at: http://localhost:{PORT}")
        print(f"  Serving authentic storefront at: http://localhost:{PORT}/collections/all.html")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == '__main__':
    run()
