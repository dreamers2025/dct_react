import React from 'react'
import './ChoiceCharacter.css'
import ChristianImg from '../image/freepik__a-photorealistic-portrait-of-a-middle-eastern-man-__83040-removebg-preview.png'
import MonkImg from '../image/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__83038-removebg-preview.png'
import Card from './Card'
//ai 캐릭터 선택 컴포넌트
const ChoiceCharacter = ({ nextStep }) => {
  return (
    <div className='container'>
      <div className='imgbox'>

        <Card src={ChristianImg}/>

        <Card src={ChristianImg}/>

        <Card src={MonkImg}/>

        <Card src={MonkImg}/>          

      </div>
      <button className='next-btn' onClick={nextStep}>다음</button>
    </div>
  )
}

export default ChoiceCharacter;