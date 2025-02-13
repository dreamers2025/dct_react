import React from "react";

//메인페이지 컴포넌트
const StartComponent = ({renderTag}) => {
  const handleStartClick = () => {
    console.log("해몽을 시작합니다!");
    console.log('props : ' + renderTag);              
  };

  return (
    <div className="overlay">
      <h1 className="title">해몽</h1>
      <button className="start-btn" onClick={handleStartClick}>시작하기</button>
    </div>
  );
};

export default StartComponent;
