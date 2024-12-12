from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from enlighten_inference import EnlightenOnnxModel
from PIL import Image
import io
import numpy as np
import cv2
from yolo_utils import get_detections
from helpers import draw_boxes_on_image
import os

app = Flask(__name__, static_folder="../web/build", static_url_path="")
CORS(app)  # React와 Flask 간의 CORS 문제 해결

# EnlightenGAN 모델 초기화
brightness_model = EnlightenOnnxModel()

@app.route('/')
def serve_index():
    """React 앱의 index.html 파일 제공"""
    return send_from_directory(app.static_folder, "index.html")

@app.route('/process-image', methods=['POST'])
def process_image():
    """이미지 처리 API"""
    if 'image' not in request.files:
        return jsonify({"error": "이미지가 없습니다."}), 400

    file = request.files['image']
    try:
        # 이미지를 열기
        image = Image.open(file)

        # PIL 이미지를 numpy 배열로 변환 (OpenCV 형식)
        image_array = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        # 조도 개선 수행
        enhanced_image = brightness_model.predict(image_array)

        # numpy 배열을 PIL 이미지로 변환
        enhanced_image_pil = Image.fromarray(cv2.cvtColor(enhanced_image, cv2.COLOR_BGR2RGB))

        # YOLO11 사람 탐지 수행
        detections = get_detections(enhanced_image)

        # 탐지된 사람 객체를 이미지에 표시
        result_image = draw_boxes_on_image(enhanced_image_pil, detections)

        # 결과 이미지를 바이트로 변환하여 React로 전송
        img_io = io.BytesIO()
        result_image.save(img_io, format="JPEG")
        img_io.seek(0)
        return send_file(img_io, mimetype='image/jpeg')
    except Exception as e:
        print(f"Error: {e}")  # 디버깅용 로그 출력
        return jsonify({"error": str(e)}), 500


@app.errorhandler(404)
def not_found(e):
    """404 에러 발생 시 React index.html 반환"""
    return send_from_directory(app.static_folder, "index.html")


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
