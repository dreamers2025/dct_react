import React, { useState } from 'react'
import './ChoiceCharacter.css'
import ChristianImg from '../image/freepik__a-photorealistic-portrait-of-a-middle-eastern-man-__83040-removebg-preview.png'
import MonkImg from '../image/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__83038-removebg-preview.png'
import Card from './Card'


//ai 캐릭터 선택 컴포넌트

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

//리액트에서 이미지 src 설정 -> 이미지 주소 import
const ChoiceCharacter = ({ nextStep, getCharacterData }) => {  

  //캐릭터 선택이 안됐을시 버튼 잠금하는 상태변수
  const [selectedRole, setSelectedRole] = useState(null);

  //캐릭터 선택시 selectedRole에 해당 캐릭터 role 세팅
  const foo = (role) => setSelectedRole(role);

  //isSelected == 카드가 리렌더링될때 selectedRole과 해당 카드의 role이 같으면 style을 부여한다

  return (
    <div className='container'>
      <div className='imgbox'>

        {cardData.map((card)=>(
          <Card
           key={card.id}
           src={card.imageSrc}
           name={card.name}
           role={card.role}
           description={card.description} 
           getCharacterData={getCharacterData}   
           onSelect={foo}  
           isSelected={card.role === selectedRole}              
           />
          ))}        

      </div>
      <button className='next-btn' onClick={nextStep} disabled={selectedRole === null}>다음</button>
    </div>
  )
}

export default ChoiceCharacter;