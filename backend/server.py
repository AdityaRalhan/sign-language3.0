from flask import Flask, Response, jsonify
import cv2
import numpy as np
import operator
from tensorflow.keras.models import model_from_json
from flask_cors import CORS
from predictions import prediction_function

app = Flask(__name__)
CORS(app)
# # Initialize MediaPipe hands
# mp_hands = mp.solutions.hands
# hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.7)
latest_prediction = {'prediction': ''}  # Global variable to store the latest prediction


@app.route('/video_feed')
def video_feed():
    global latest_prediction
    return Response(prediction_function(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_prediction')
def get_prediction():
    # Serve the latest prediction to React
    global latest_prediction
    return jsonify(latest_prediction)

if __name__ == "__main__":
    app.run(debug=True, port=8080)
