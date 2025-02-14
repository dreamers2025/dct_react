import React from 'react'
import './ChoiceCharacter.css'
import ChristianImg from '../image/freepik__a-photorealistic-portrait-of-a-middle-eastern-man-__83040-removebg-preview.png'
import MonkImg from '../image/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__83038-removebg-preview.png'
import Card from './Card'


//ai 캐릭터 선택 컴포넌트

//카드 데이터터
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
const ChoiceCharacter = ({ nextStep }) => {

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
           />
          ))}        

      </div>
      <button className='next-btn' onClick={nextStep}>다음</button>
    </div>
  )
}

export default ChoiceCharacter;