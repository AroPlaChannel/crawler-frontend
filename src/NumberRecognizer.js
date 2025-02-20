import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const NumberRecognizer = () => {
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null);
  let isDrawing = false;

  const startDrawing = (e) => {
    isDrawing = true;
    draw(e);
  };

  const endDrawing = () => {
    isDrawing = false;
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    context.lineWidth = 20;
    context.lineCap = 'round';
    context.strokeStyle = 'black';

    context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setResult(null);
  };

  const recognizeDigit = () => {
    // 获取画布并缩放为28x28像素
    const canvas = canvasRef.current;
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = 28;
    scaledCanvas.height = 28;
    const scaledContext = scaledCanvas.getContext('2d');

    // 将大画布的内容绘制到小画布上
    scaledContext.drawImage(canvas, 0, 0, 28, 28);

    // 获取像素数据
    const imageData = scaledContext.getImageData(0, 0, 28, 28);
    const data = imageData.data;

    const inputs = [];
    for (let i = 0; i < data.length; i += 4) {
      // 计算灰度值
      const grayscale = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
      // 反转颜色（黑底白字）
      const normalized = 255 - grayscale;
      inputs.push(normalized);
    }

    axios.post('https://crawler-backend-whl4.onrender.com/api/recognize_digit', { inputs }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("Response data:", response.data);  // 检查响应数据
        setResult(response.data.label);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>手写数字识别</h2>
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        style={{ border: '1px solid #000', backgroundColor: 'white' }}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
      <div style={{ marginTop: '16px' }}>
        <Button type="primary" onClick={recognizeDigit}>识别</Button>
        <Button style={{ marginLeft: '8px' }} onClick={clearCanvas}>清除</Button>
      </div>
      {result !== null && <h3>识别结果：{result}</h3>}
    </div>
  );
};

export default NumberRecognizer;
