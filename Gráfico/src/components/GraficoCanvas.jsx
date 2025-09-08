import React, { useRef, useEffect, useState } from "react";
import Switch from "react-switch";
import "../App.css";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "20px",
  fontFamily: "sans-serif",
};

const tituloStyle = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#333",
};

const canvasStyle = {
  border: "1px solid #ccc",
  backgroundColor: "#eee",
  marginBottom: "20px",
};

export default function GraficoCanvas() {
  const canvasRef = useRef(null);
  const [data, setData] = useState([20, 40, 60, 80, 50]);
  const [selectedColor, setSelectedColor] = useState("dodgerblue");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // @ts-ignore
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // @ts-ignore
    const width = canvas.width;
    // @ts-ignore
    const height = canvas.height;
    const barWidth = 40;
    const gap = 15;
    const startX = (width - data.length * (barWidth + gap)) / 2;

    ctx.clearRect(0, 0, width, height);

    data.forEach((value, index) => {
      const x = startX + index * (barWidth + gap);
      const barHeight = (value / 100) * (height - 50);
      const y = height - barHeight - 20;

      ctx.fillStyle = selectedColor;
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "12px Arial";
      ctx.fillText(value, x + barWidth / 2, y + 20);
    });

    ctx.strokeStyle = "#333"; //cor de contorno
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height - 20);
    ctx.lineTo(width, height - 20);
    ctx.stroke();
  }, [data, selectedColor]);

  const addRandomBar = () => {
    const newValue = Math.floor(Math.random() * 90) + 10;
    setData((prevData) => [...prevData, newValue]);
  };

  const handleChange = (newColor) => {
    setSelectedColor(selectedColor === newColor ? "dodgerblue" : newColor);
  };

  return (
    <div style={containerStyle}>
      <h2 style={tituloStyle}>Gráfico de Barras com Canvas</h2>

      {/* O elemento Canvas com a ref e os atributos width/height */}
      <canvas
        ref={canvasRef} // Referência para o elemento canvas. Propriedade do React para acessar o elemento do DOM diretamente no código
        width={350}
        height={200}
        style={canvasStyle}
      />
      <div className="containerSwtichs">
        <div className="swtichs">
          <Switch
            onChange={() => handleChange("Red")}
            checked={selectedColor === "Red"}
          />
          <p>Red</p>
          <Switch
            onChange={() => handleChange("Green")}
            checked={selectedColor === "Green"}
          />
          <p>Green</p>
          <Switch
            onChange={() => handleChange("Yellow")}
            checked={selectedColor === "Yellow"}
          />
          <p>Yellow</p>
        </div>
      </div>
      <button onClick={addRandomBar}>Adicionar Barra Aleatória</button>
    </div>
  );
}
