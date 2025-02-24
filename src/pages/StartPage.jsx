import React, { useState } from "react";
import './Startpage.css'
import StartComponent from "../components/StartComponent";
import ChoiceCharacter from "../components/ChoiceCharacter";
import UserExperience from "../components/UserExperience";
import DreamContents from "../components/DreamContents";
import ResultPage from "./ResultPage";
import ShowResults from"../components/ShowResults";

//카드 데이터 StartPage에서 관리
import ChristianImg from '../image/CHRISTIAN.png'
import MonkImg from '../image/MONK.png'

//카드 데이터
const cardData = [
  {
    id: 1,
    name: '스님',
    role: 'MONK',
    imageSrc: MonkImg, // 스님의 사진 경로
    description: '" 허허, 마음을 비우면 답은 자연히 오는 법이오. "',
    issueQuestion: '" 그대는 무슨 고민을 품고 있소 ? 모든 것이 덧없고, 지나가는 일들에 지나지 않으니, 잠시 그 마음을 내려놓고, 깊은 고요 속에서 그 답을 찾으시게나. "',
    dreamQuestion: '" 허허, 그런 고민이 있으셨군요. 이제, 그대의 꿈 이야기를 들려주시오. 내가 답을 찾아드리리라. "'
  },
  {
    id: 2,
    name: '기독교인',
    role: 'CHRISTIAN',
    imageSrc: ChristianImg, // 기독교인의 사진 경로
    description: '" 하나님께서는 항상 우리와 함께하시며, 우리의 마음에 평안을 주십니다. 아멘. "',
    issueQuestion: '" 혹시 마음에 고민거리가 있으신가요 ? 말씀해 주세요. 하나님께서 들으시고, 평안을 주시기 원하십니다." ',
    dreamQuestion: '" 그런 고민이 있으시군요. 최근에 주님께서 주신 꿈에 특별한 일이 없으셨나요 ? "'
  }
];

const StartPage = () => {  

  //사용자 데이터 상태변수

  const [interpreterType,setInterpreterType] = useState(''); //서버에 전달할 롤
  const [experience,setExperience] = useState(''); //서버에 전달할 사용자 경험
  const [dreamContent,setDreamContent] = useState(''); //서버에 전달할 사용자 꿈
  const [filteredCard,setFilteredCard] = useState(''); //사용자가 선택한 카드객체
  const [responseResults,setResponseResults] = useState(null);//최종 결과객체

  //stept값에 따라 질문지 변경
  const [step,setStep] = useState(0);

  //부모 컴포넌트에서 상태관리 , 자식 컴포넌트에 함수를 내려주기
  const nextStep = () => {
    setStep(step + 1);
  }; 
  
  //이전 버튼
  const prevStep = () => {
    setStep(step - 1);
  };    

  //사용자가 선택한 캐릭터 데이터 받아오기
  const getCharacterData = (data)=> {
    const selectedCard = cardData.filter(card => card.role === data); //선택된 카드 객체 필터링    
    setInterpreterType(data);  // 롤 세팅  
    setFilteredCard(selectedCard); // 선택된 카드 세팅       
  };  

  //사용자 경험 받아오기
  const getUserExperience = (data) => {
        setExperience(data);      
  }

  //사용자 꿈 받아오기
  const getUserDreamContents = (data) => {
    setDreamContent(data)
  }

  //서버로 보낼 데이터 값
  const payload = {
    interpreterType,
    experience,
    dreamContent,
  }

  //Ai 답변 결과 데이터  
  const getResults = (data) => {
    setResponseResults(data);  // 받아온 AI 결과 데이터를 상태에 저장
  };


  //step 증가에 따라 컴포넌트 렌더링
  return (    
      <>
        {step === 0 && <StartComponent nextStep={nextStep}/>}
        {step === 1 && <ChoiceCharacter nextStep={nextStep} prevStep={prevStep} getCharacterData={getCharacterData} cardData={cardData} step={step}/>}
        {step === 2 && <UserExperience nextStep={nextStep} prevStep={prevStep} getUserExperience={getUserExperience} filteredCard={filteredCard} step={step} />}
        {step === 3 && <DreamContents nextStep={nextStep} prevStep={prevStep} getUserDreamContents={getUserDreamContents} filteredCard={filteredCard} step={step} payload={payload} />}
        {step === 4 && <ResultPage nextStep={nextStep} filteredCard={filteredCard} payload={payload} getResults={getResults}/>}
        {step === 5 && <ShowResults filteredCard={filteredCard} responseResults={responseResults}/>}
      </>          
  );
};

export default StartPage;
