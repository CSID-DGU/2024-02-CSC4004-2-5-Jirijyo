from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from helpers import draw_boxes_on_image
from yolo_utils import get_detections
from PIL import Image
import io
import numpy as np

app = Flask(__name__)
CORS(app)  # React와 Flask 간의 CORS 문제 해결

@app.route('/detect-objects', methods=['POST'])
def detect_objects():
    if 'image' not in request.files:
        return "이미지가 없습니다.", 400

    file = request.files['image']
    try:
        # 이미지를 열고 객체 탐지 수행
        image = Image.open(file)

        # 업로드된 이미지의 확장자 확인
        file_extension = file.filename.split('.')[-1].lower()
        print(f"Uploaded file extension: {file_extension}")

        # YOLO 모델이 요구하는 형식으로 변환 (numpy 배열 또는 적절한 크기로 리사이즈)
        model_input_size = (640, 640)  # YOLO 모델의 입력 크기
        image = image.resize(model_input_size)  # PIL 이미지를 YOLO 입력 크기로 리사이즈
        image_array = np.array(image)  # PIL 이미지를 numpy 배열로 변환
        print(f"Processed image shape: {image_array.shape}")

        detections = get_detections(image_array)

        # 경계 상자와 라벨을 그린 이미지 생성
        image_with_boxes = draw_boxes_on_image(image, detections)

        if not image.format:
            print("Image format not detected. Setting default to JPEG.")
            image.format = "JPEG"

        # 결과 이미지를 바이트로 변환하여 React로 전송
        img_io = io.BytesIO()
        image_with_boxes.save(img_io, format=image.format)
        img_io.seek(0)
        mimetype = f'image/{image.format.lower()}' if image.format else 'image/jpeg'
        return send_file(img_io, mimetype=mimetype)
    except Exception as e:
        print(f"Error: {e}")  # 디버깅용 로그 출력
        return str(e), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
