import './App.css'
import React from 'react';

function App() {
  const handleStartClick = () => {
    console.log('해몽을 시작합니다!');
  };

  return (
    <div className="main-page">
      <div className="overlay">
        <h1 className="title">해몽</h1>
        <button className="start-btn" onClick={handleStartClick}>
          시작하기
        </button>
      </div>
      <div className="moon"></div>
      <div className="stars"></div>
    </div>
  );
}

export default App
