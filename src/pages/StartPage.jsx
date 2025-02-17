import React, { useState } from "react";
import './Startpage.css'
import StartComponent from "../components/StartComponent";
import ChoiceCharacter from "../components/ChoiceCharacter";
import UserExperience from "../components/UserExperience";
import DreamContents from "../components/DreamContents";

//카드 데이터 StartPage에서 관리
import ChristianImg from '../image/freepik__a-photorealistic-portrait-of-a-middle-eastern-man-__83040-removebg-preview.png'
import MonkImg from '../image/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__83038-removebg-preview.png'
//카드 데이터
const cardData = [
  {
    id: 1,
    name: '스님',
    role: '스님',
    imageSrc: MonkImg, // 스님의 사진 경로
    description: '이것은 스님입니다.'
  },
  {
    id: 2,
    name: '기독교인',
    role: '기독교인',
    imageSrc: ChristianImg, // 기독교인의 사진 경로
    description: '이것은 기독교인입니다.'
  }
];

const StartPage = () => {  

  //사용자 데이터 상태변수

  const [interpreterType,setInterpreterType] = useState(''); //서버에 전달할 롤
  const [experience,setExperience] = useState(''); //서버에 전달할 사용자 경험
  const [dreamContent,setDreamContent] = useState(''); //서버에 전달할 사용자 꿈
  const [filteredCard,setFilteredCard] = useState(''); //사용자가 선택한 카드객체

  //상태값을 처리하는 함수
  const [step,setStep] = useState(0);

  //부모 컴포넌트에서 상태관리 , 자식 컴포넌트에 함수를 내려주기
  const nextStep = () => {
    setStep(step + 1);
  };    

  const getCharacterData = (data)=> {
    const selectedCard = cardData.filter(card => card.role === data); //선택된 카드 객체 필터링    
    setInterpreterType(data);  // 롤 세팅  
    setFilteredCard(selectedCard); // 선택된 카드 세팅       
  };  

  return (    
      <>
        {step === 0 && <StartComponent nextStep={nextStep}/>}
        {step === 1 && <ChoiceCharacter nextStep={nextStep} getCharacterData={getCharacterData} cardData={cardData}/>}
        {step === 2 && <UserExperience nextStep={nextStep} filteredCard={filteredCard} />}
        {step === 3 && <DreamContents/>}
      </>          
  );
};

export default StartPage;
