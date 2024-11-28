import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [rotatedImage, setRotatedImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("이미지를 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/rotate-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setRotatedImage(imageUrl);
      } else {
        alert("이미지 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
}

export default App;
