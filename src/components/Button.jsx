import React from 'react'
import './Button.css';

const Button = ({ nextStep,prevStep }) => {
  return (
    <div className='btn-box'>
          <button className='prev-btn' onClick={prevStep} >이전</button>
          <button className='next-btn' onClick={nextStep} >다음</button>
    </div>
  )
}

export default Button;