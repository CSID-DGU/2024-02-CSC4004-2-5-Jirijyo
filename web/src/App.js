document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload-form');
  const fileInput = document.getElementById('file-upload');
  const resultContainer = document.getElementById('result-container');

  //새로 추가
  const actionButtons = document.querySelector('.action-buttons');
  const retryButton = document.getElementById('retry-button');
  const downloadButton = document.getElementById('download-button');

  resultContainer.style.display = 'none';
  actionButtons.style.display = 'none';
  //

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
        //resultContainer.innerHTML = `<img src="${imageUrl}" alt="Detection Result" class="result-image">`;

        //추가 : 원본 이미지와 결과 이미지 표
        resultContainer.innerHTML = `
          <div id="original-image-container">
            <h3>원본 이미지</h3>
            <img id="original-image" src="${URL.createObjectURL(file)}" alt="Original Image" class="result-image">
          </div>
          <div id="result-image-container">
            <h3>결과 이미지</h3>
            <img id="result-image" src="${imageUrl}" alt="Detection Result" class="result-image">
          </div>
        `;
       
        resultContainer.style.display = 'block';

         // "다시 하기"와 "다운로드" 버튼을 보이게 설정
        actionButtons.style.display = 'block';

        // 다운로드 버튼의 링크를 결과 이미지로 설정
        downloadButton.href = imageUrl;
        downloadButton.download = 'result-image.png';

      } else {
        const error = await response.json();
        alert(`오류 발생: ${error.error}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  });
  retryButton.addEventListener('click', () => {
    // 업로드 폼과 결과 초기화
    fileInput.value = ''; // 파일 선택 초기화
    resultContainer.style.display = 'none';
    actionButtons.style.display = 'none';
    resultContainer.innerHTML = ''; // 결과 컨테이너 비우기
  });
});
