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


+ Rogoflow Universe 플랫폼에서 제공하는 데이터셋을 이용했습니다.

  ![전처리](https://github.com/CSID-DGU/2024-02-CSC4004-2-5-Jirijyo/blob/main/%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EC%B2%98%EB%A6%AC.png)
  
  원본 이미지 → 밝기 감소 → 노이즈 추가 → 저장을 통해 데이터 전처리


### 저조도 개선 딥러닝 모델을 통한 이미지 조도 개선


+ 저조도 개선을 위한 모델 : Zero-DCE, EnlightenGAN, CIDNet
  
  ![모델 비교](https://github.com/CSID-DGU/2024-02-CSC4004-2-5-Jirijyo/blob/main/%EC%A0%80%EC%A1%B0%EB%8F%84%20%EB%AA%A8%EB%8D%B8%20%EB%B9%84%EA%B5%90.png)

  3가지의 모델의 장단점은 다음과 같습니다. 해당 모델들을 사용해 YOLO 모델 학습을 하여 어떤 모델을 사용할 지 정합니다.
  

### 사람 객체 인식 딥러닝 모델 파인튜닝


+ YOLO 학습 with 저조도 개선 딥러닝 모델 성능 비교
  
![성능 비교](https://github.com/CSID-DGU/2024-02-CSC4004-2-5-Jirijyo/blob/main/%EC%84%B1%EB%8A%A5%EB%B9%84%EA%B5%90.png)
   
   결론 : alpha = 0.3으로 학습된 EnlightenGAN 기반 YOLO 모델의 가중치 best.pt를 최종적으로 사용하게 되었습니다.
  

### 웹 배포

* 웹은 프로젝트 간단 소개 / 모델 테스트 / 개발진 간단 소개 로 구성되었습니다.

![웹 이미지](https://github.com/CSID-DGU/2024-02-CSC4004-2-5-Jirijyo/blob/main/%EC%9B%B9%20%EC%9D%B4%EB%AF%B8%EC%A7%80.png)
  
---
* local
  
해당 레파지토리로 로컬 실행 시, git clone을 통해 enlighten GAN 을 설치해야 합니다.

git 주소1 : https://github.com/KwanHoo/Enlighten-GAN_test

git 주소2 : https://github.com/arsenyinfo/EnlightenGAN-inference

flask-server에서 python app.py를 통해 서버를 열고, http 주소로 이동하여 확인이 가능합니다.

---

* 웹 배포

프론트 웹사이트 : https://baekmingyeong.github.io/beakmingyeong.github.io/

서버:http://172.31.7.213:5000/

해당 프로젝트 로컬 실행 결과 : https://youtu.be/XVklEc8Z750
