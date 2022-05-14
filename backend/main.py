import os
import re
from flask import Flask, Response, request
# Raspberry Pi camera module (requires picamera package, developed by Miguel Grinberg)
from datetime import datetime
import time 

app = Flask(__name__)

@app.route('/time')
def time():
    def generate():
        while True:
            yield "{}\n".format(datetime.now().isoformat())
            time.sleep(1)
    return Response(generate(), mimetype='text/plain')

@app.after_request
def after_request(response):
    response.headers.add('Accept-Ranges', 'bytes')
    return response


def get_chunk(full_path, byte1=None, byte2=None):
    file_size = os.stat(full_path).st_size
    start = 0
    
    if byte1 < file_size:
        start = byte1
    if byte2:
        length = byte2 + 1 - byte1
    else:
        length = file_size - start

    with open(full_path, 'rb') as f:
        f.seek(start)
        chunk = f.read(length)
    return chunk, start, length, file_size

def get_byte_range():
    range_header = request.headers.get('Range', None)
    byte1, byte2 = 0, None
    if range_header:
        match = re.search(r'(\d+)-(\d*)', range_header)
        groups = match.groups()

        if groups[0]:
            byte1 = int(groups[0])
        if groups[1]:
            byte2 = int(groups[1])
    
    return byte1, byte2

def video_response(chunk, start, length, file_size):
    resp = Response(chunk, 206, mimetype='video/mp4',
                      content_type='video/mp4', direct_passthrough=True)
    resp.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(start, start + length - 1, file_size))
    return resp

@app.route('/stream/1')
def get_stream_1():
    return video_response(*get_chunk("dallaus.mp4",*get_byte_range()))

@app.route('/stream/2')
def get_stream_2():
    return video_response(*get_chunk("dallaus.mp4",*get_byte_range()))

@app.route('/stream/3')
def get_stream_3():
    return video_response(*get_chunk("dallaus.mp4",*get_byte_range()))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True, threaded=True)