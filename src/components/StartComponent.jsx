import React from "react";

//메인페이지 컴포넌트
//부모로 부터 nextStep 함수 내려받기
const StartComponent = ( { nextStep } ) => {   

  return (
    <div className="overlay">
      <h1 className="title">해몽</h1>
      <button className="start-btn" onClick={nextStep}>시작하기</button>
    </div>
  );
};

export default StartComponent;
