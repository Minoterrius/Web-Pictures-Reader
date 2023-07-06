# Web Pictures Reader

Web Pictures Reader is a simple web application that allows you to read a folder of images on one tab of your browser. It is particularly useful to view a lot of .webp images, as it is not supported by classic apps such as Windows Photos.

## Installation and usage on Windows

### Installation

Download the project on your computer, open a terminal and run the following :

```bash
cd .\server\
pip install -r requirements.txt
```

### Client

Run the client with :

```bash
cd .\client\
npm run dev
```

You can access the front-end on http://127.0.0.1:5173/

To load images from a local folder, simply click the repository button on the upper left and select it. You can navigate with the arrow buttons or the keyboard arrows.

### Server (PoC)

To run the server, open another terminal and write the following :

```bash
cd .\server\
venv\Scripts\activate
python server.py
```

You can access the back-end on http://127.0.0.1:5000/

It is just a Proof of Concept as it only loads the default images on the viewer.
