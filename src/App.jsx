import React, { useState, useEffect } from "react";
import RandomImagen from "./RandomImagen";
import "./App.css";

function App() {
        const [bgGradient, setBgGradient] = useState(
          "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)"
      );

    const  changeBackground = () => {
      const colors = [
      "#ff6b6b",
      "#4facfe",
      "#43e97b",
      "#fa709a",
      "#fddb92",
      "#667eea",
      "#30cfd0",
      "#ff9a9e",
    ];
      const random1 = colors[Math.floor(Math.random() * colors.length)];
      const random2 = colors[Math.floor(Math.random() * colors.length)];
      const random3 = colors[Math.floor(Math.random() * colors.length)];
      setBgGradient(`linear-gradient(135deg, ${random1}, ${random2}, ${random3})`);
    };

    useEffect(() => {
      document.body.style.background = bgGradient;
      document.body.style.transition = "background 1s ease";
    }, [bgGradient]);


  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Random Imagen</h1>
        <RandomImagen onNewImage={changeBackground}/>
      </div>
    </div>
  );
}

export default App;
