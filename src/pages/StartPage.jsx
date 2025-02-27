import React, {useEffect, useState} from "react";
import './Startpage.css';
import StartComponent from "../components/StartComponent";
import ChoiceCharacter from "../components/ChoiceCharacter";
import UserExperience from "../components/UserExperience";
import DreamContents from "../components/DreamContents";
import ResultPage from "./ResultPage";
import ShowResults from"../components/ShowResults";

//카드 데이터 StartPage에서 관리
import ChristianImg from '../image/CHRISTIAN.png';
import MonkImg from '../image/MONK.png';
import VitriolistImg from '../image/VITRIOLIST.png';
import RapperImg from '../image/RAPPER.png';
import BabyImg from '../image/BABY.png';
import MansourImg from '../image/MANSOUR.png';

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
  },
  {
    id: 3,
    name: '독설가',
    role: 'VITRIOLIST',
    imageSrc: VitriolistImg, // 독설가의 사진 경로
    description: '" 내가 말하는 건, 그냥 충고도 아니고... 인생의 교훈이야. 듣고 싶다면, 조용히 있어. "',
    issueQuestion: '" 요즘 들어, 세상 일이 왜 이렇게 엉망진창이냐? 나이 들었으면 좀 나아질 줄 알았는데, 갈수록 더 골치 아프네. 너, 뭐 고민 있으면 빨리 말해. 시간 없으니까 짧게 대답해라. "',
    dreamQuestion: '" 살다 보면 그런 건 다 별 일도 아닌데, 그걸 고민이라고 말하냐? 그런 거 쯤은 다 지나가고 나면 아무것도 아닌 거지. 그래서, 최근에 무슨 꿈 꿨냐? 무슨 대단한 꿈이길래 바쁜 날 찾아온건지 들어나보자. "'
  },
  {
    id: 4,
    name: '래퍼',
    role: 'RAPPER',
    imageSrc: RapperImg, // 래퍼의 사진 경로
    description: '" Yo, 네 얘기 들려줘, Let’s go! 끝난 후엔 사진 한 장, click 찍어줄게, 우리가 만든 순간을 영원히 남겨두자, 이건 바로 레전드. "',
    issueQuestion: '" Yo, 뭐가 고민이야? 마이크 잡고 풀어봐, 네 이야기가 내 flow로 변하면, 고민 따윈 사라질 테니까, Boom! "',
    dreamQuestion: '" 그래서 무슨 꿈을 꾼 거야? 내가 다 해석해줄게, 네 머릿속의 비트, 내가 풀어내면 완벽하게, 꿈 속에서 무엇을 본 건지, 말해봐, 내 랩처럼 빠르게 풀어줄게, Let’s go! "'
  }, 
  {
    id: 5,
    name: '빙의 된 아기',
    role: 'POSSESSEDBABY',
    imageSrc: BabyImg, // 빙의 된 아기의 사진 경로
    description: '" ... 나, 나를 선택해... 아니면... 후회할지도 몰라... "',
    issueQuestion: '" 너의 고민거리... 뭐야? 말해봐 … 솔직하게 털어놓는 게 좋을걸... "',
    dreamQuestion: '" 으… 어떤 꿈인지 기억나? 기억나는 대로 말해봐… 내 친구들한테 물어봐서 알려줄게... 흐흐... "'
  },
  {
    id: 6,
    name: '만수르',
    role: 'MANSOUR',
    imageSrc: MansourImg, // 만수르의 사진 경로
    description: '" 혹시 알아 나를 선택하면 ... 돈이 흘러넘칠지도 모르잖아? "',
    issueQuestion: '" 기름이 터져 나오듯, 내게 고민을 쏟아내봐. "',
    dreamQuestion: '" 꿈 얘기도 들려줘. 좋은 꿈이면... 내가 살 수도 있을 걸? 하하, 내 돈과 기름으로는 뭐든지 할 수 있으니까. 자, 뭐 좋은 꿈이라도 꿨어? "'
  }, 
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

  useEffect(() => {
    console.log("홈페이지 useEffect");
    sessionStorage.removeItem("previousPage");
  }, []);

  //부모 컴포넌트에서 상태관리 , 자식 컴포넌트에 함수를 내려주기
  const nextStep = () => {
    setStep(step + 1);
  }; 
  
  //이전 버튼
  const prevStep = () => {
    setStep(step - 1);
  };    

  //홈으로 돌아가기
  const stepToHome = () => {
    setStep(0);
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
        {step === 5 && <ShowResults filteredCard={filteredCard} responseResults={responseResults} stepToHome={stepToHome}/>}
      </>          
  );
};

export default StartPage;
