const API_URL = "http://10.1.1.4:5000";

document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload-form');
  const fileInput = document.getElementById('file-upload');
  const resultContainer = document.getElementById('result-container');
  const originalContainer = document.getElementById('original-container');

  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 동작(페이지 새로고침) 방지

    const file = fileInput.files[0];
    if (!file) {
      alert('이미지를 선택하세요.');
      return;
    }
    const imageUrl = URL.createObjectURL(file); // 업로드된 파일을 임시 URL로 변환
    originalContainer.innerHTML = `<img src="${imageUrl}" alt="Original Source" class="original-image">`;

    if (!document.querySelector('.dynamic-arrow')) {
      const arrow = document.createElement('div');
      arrow.classList.add('arrow', 'dynamic-arrow'); // 화살표 클래스 추가
      arrow.innerHTML = '→';
      originalContainer.parentElement.insertBefore(arrow, resultContainer); // 화살표를 두 컨테이너 사이에 삽입
    }

    const formData = new FormData();
    formData.append('image', file);
    try {
      // Flask 서버에 POST 요청
      const response = await fetch('http://10.1.1.4:5000/process-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // 결과 이미지 표시
        
        resultContainer.innerHTML = `<img src="${imageUrl}" alt="Detection Result" class="result-image">`;
      } else {
        const error = await response.json();
        alert(`오류 발생: ${error.error}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  });
});
