document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload-form');
  const fileInput = document.getElementById('file-upload');
  const resultContainer = document.getElementById('result-container');
  const originalImage = document.getElementById('original-image');
  const resultImage = document.getElementById('result-image');
  const actionButtons = document.querySelector('.action-buttons');
  const retryButton = document.getElementById('retry-button');
  const downloadButton = document.getElementById('download-button');
  const uploadButton = document.querySelector('.upload-button');

  resultContainer.style.display = 'none';
  actionButtons.style.display = 'none';

  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 동작(페이지 새로고침) 방지

    const file = fileInput.files[0];
    if (!file) {
      alert('이미지를 선택하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Flask 서버에 POST 요청
      const response = await fetch('http://127.0.0.1:5000/process-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        uploadButton.style.display = 'none';
        // 원본 이미지와 결과 이미지 표시
        originalImage.src = imageUrl;
        resultImage.src = imageUrl; // 결과 이미지는 원본과 동일한 이미지 표시

        resultContainer.style.display = 'block';
        actionButtons.style.display = 'flex';

        // 다운로드 버튼 링크 설정
        downloadButton.href = imageUrl;
      } else {
        const error = await response.json();
        alert(`오류 발생: ${error.error}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  });
  // "다시 하기" 버튼 클릭 처리
  retryButton.addEventListener('click', () => {
    fileInput.value = ''; // 파일 입력 초기화
    resultContainer.style.display = 'none'; // 결과 숨기기
    actionButtons.style.display = 'none'; // 버튼 숨기기
    originalImage.src = ''; // 이미지 초기화
    resultImage.src = ''; // 이미지 초기화
    uploadButton.style.display = 'inline-block';
  });
});
