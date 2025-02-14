import React, { useState } from "react";
import './Startpage.css'
import StartComponent from "../components/StartComponent";
import ChoiceCharacter from "../components/ChoiceCharacter";
import UserExperience from "../components/UserExperience";
import DreamContents from "../components/DreamContents";


const StartPage = () => {  

  //사용자 데이터 상태변수

  const [interpreterType,setInterpreterType] = useState('');
  const [experience,setExperience] = useState('');
  const [dreamContent,setDreamContent] = useState('');

  //상태값을 처리하는 함수
  const [step,setStep] = useState(0);

  //부모 컴포넌트에서 상태관리 , 자식 컴포넌트에 함수를 내려주기
  const nextStep = () => {
    setStep(step + 1);
  };

  const getCharacterData = (data)=> {
    console.log(data);
    
    setInterpreterType(data);   
    
  };

 

  

  return (    
      <>
        {step === 0 && <StartComponent nextStep={nextStep}/>}
        {step === 1 && <ChoiceCharacter nextStep={nextStep} getCharacterData={getCharacterData}/>}
        {step === 2 && <UserExperience/>}
        {step === 3 && <DreamContents/>}
      </>      
    
  );
};

export default StartPage;
