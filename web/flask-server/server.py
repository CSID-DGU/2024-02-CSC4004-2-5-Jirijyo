from flask import Flask, request, send_file
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # React와 Flask 간의 CORS 문제 해결

@app.route('/rotate-image', methods=['POST'])
def rotate_image():
    if 'image' not in request.files:
        return "이미지가 없습니다.", 400

    file = request.files['image']
    try:
        # 이미지를 열고 180도 회전
        image = Image.open(file)
        rotated_image = image.rotate(180)

        # 결과 이미지를 바이트로 변환하여 React로 전송
        img_io = io.BytesIO()
        rotated_image.save(img_io, format=image.format)
        img_io.seek(0)
        return send_file(img_io, mimetype=f'image/{image.format.lower()}')
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
