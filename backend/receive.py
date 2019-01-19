import time
import socket
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

HOST_NAME = '127.0.0.1'
PORT_NUMBER = 9000


class MyHandler(BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()


    def do_POST(self):
        content_len = int(self.headers.get('Content-Length'))
        content = self.rfile.read(content_len).decode('UTF-8')
        print(content)
        self.respond({'status': 500}, content)


    def handle_http(self, status_code, content):
        self.send_response(status_code)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        data = json.loads(content)
        data_str = json.dumps(data)
        return bytes(data_str, 'UTF-8')


    def respond(self, opts, content):
        response = self.handle_http(opts['status'], content)
        self.wfile.write(response)

if __name__ == '__main__':
    server_class = HTTPServer
    httpd = server_class((socket.gethostbyname(''), PORT_NUMBER), MyHandler)
    print(time.asctime(), 'Server Starts - %s:%s' % (socket.gethostbyname(''), PORT_NUMBER))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print(time.asctime(), 'Server Stops - %s:%s' % (socket.gethostbyname(''), PORT_NUMBER))
