import React, { useState } from "react";
import './Startpage.css'
import StartComponent from "../components/StartComponent";
import ChoiceCharacter from "../components/ChoiceCharacter";
import UserExperience from "../components/UserExperience";
import DreamContents from "../components/DreamContents";


const StartPage = () => {  

  //상태값을 처리하는 함수
  const [step,setStep] = useState(0);

  //부모 컴포넌트에서 상태관리 , 자식 컴포넌트에 함수를 내려주기기
  const nextStep = () => {
    setStep(step + 1);
  };

  return (    
      <>
        {step === 0 && <StartComponent nextStep={nextStep}/>}
        {step === 1 && <ChoiceCharacter nextStep={nextStep}/>}
        {step === 2 && <UserExperience/>}
        {step === 3 && <DreamContents/>}
      </>      
    
  );
};

export default StartPage;
