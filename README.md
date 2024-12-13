# 2024-02-CSC4004-2-5-Jirijyo
5조 지리죠?
---

팀장: 윤여찬

팀원: 김윤지, 백민경, 이용우

---

# 프로젝트 소개

주요 8개의 범죄유형 중, 6가지의 범죄유형이 야간에 많이 발생합니다. 
범죄 예방과 수사 활용 목적으로 방범용 CCTV가 보급되었으나, 저조도 환경으로 방법용 CCTV의 활용성이 감소합니다. CCTV의 교체는 지자체의 예산의 문제로 인해, 보급된 CCTV를 사용해야 합니다.

따라서 본 프로젝트는 **방법용 CCTV의 저조도 영상의 한계를 극복**하기 위해 **저조도 영상에서의 사람 객체 인식 성능 향상 모델을 개발**하는 것이 목적입니다.
해당 목적을 달성하기 위한 세부 목표는 다음과 같습니다.

1. 데이터 저조도 처리
2. 저조도 개선 딥러닝 모델을 통한 이미지 조도 개선
3. 사람 객체 인식 딥러닝 모델 파인튜닝
4. 웹 페이지 배포

### 데이터 저조도 처리
---

+ Rogoflow Universe 플랫폼에서 제공하는 데이터셋을 이용
  원본 이미지 -> 밝기 감소 -> 노이즈 추가 -> 저장을 통해 데이터 전처리

### 저조도 개선 딥러닝 모델을 통한 이미지 조도 개선
---

+ 저조도 개선을 위한 모델 : Zero-DCE, EnlightenGAN, CIDNet

### 사람 객체 인식 딥러닝 모델 파인튜닝
---

+ YOLO 학습 with 저조도 개선 딥러닝 모델 성능 비교
  

  결론 : alpha = 0.3으로 학습된 EnlightenGAN 기반 YOLO 모델의 가중치 best.pt를 최종적으로 사용하게 되었습니다.

### 웹 배포
---
*local
해당 레파지토리로 로컬 실행 시, git clone을 통해 enlighten GAN 을 설치해야 합니다.
git 주소1 : https://github.com/KwanHoo/Enlighten-GAN_test

git 주소2 : https://github.com/arsenyinfo/EnlightenGAN-inference

flask-server에서 python app.py를 통해 서버를 열고, http 주소로 이동하여 확인이 가능합니다.

----------

*웹 배포

프론트 웹사이트 : https://baekmingyeong.github.io/beakmingyeong.github.io/

서버:http://172.31.7.213:5000/

해당 프로젝트 로컬 실행 결과 : https://youtu.be/XVklEc8Z750
