document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload-form');
  const fileInput = document.getElementById('file-upload');
  const resultContainer = document.getElementById('result-container');

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
      const response = await fetch('http://localhost:5000/detect-objects', {
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
