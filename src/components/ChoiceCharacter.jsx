import React from 'react'
import './ChoiceCharacter.css'
import ChristianImg from '../image/freepik__a-photorealistic-portrait-of-a-middle-eastern-man-__83040-removebg-preview.png'
import MonkImg from '../image/freepik__the-style-is-modern-and-it-is-a-detailed-illustrat__83038-removebg-preview.png'

//ai 캐릭터 선택 컴포넌트
const ChoiceCharacter = () => {
  return (
    <div className='box'>

      <div className='imgcard'>
        <img src={ChristianImg} alt="" />
      </div>

      <div className='imgcard'>
        <img src={MonkImg} alt="" />
      </div>      

    </div>
  )
}

export default ChoiceCharacter;