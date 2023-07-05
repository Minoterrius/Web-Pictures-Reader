from os import listdir
from os.path import isfile, join
import io
from base64 import encodebytes
from flask import Flask, jsonify
from flask_cors import CORS
from PIL import Image


app = Flask(__name__)
cors = CORS(app, ressources={r"/*": {"origins": "http://localhost:3000"}})

default_path = './images-example'

@app.route('/')
def index():
    return 'Hello, World!'

def get_images_from_local_storage(folder_path):
    return [f for f in listdir(folder_path) if isfile(join(folder_path, f))]

def get_response_image(folder_path, image_path):
    pil_img = Image.open(folder_path+'\\'+image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='WEBP') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img

@app.route("/get-default-images")
def get_default_images(folder_path=default_path):
    result = get_images_from_local_storage(folder_path) #list of path images
    encoded_images = []
    for image_path in result:
        encoded_images.append(get_response_image(folder_path, image_path))
    return jsonify({'result': encoded_images})

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)