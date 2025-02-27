import React, { useState } from 'react';
import './UserExperience.css'
import SelectedCard from './SelectedCard'
import Button from './Button'
//최근 고민거리 컴포넌트
const UserExperience = ({ nextStep,prevStep, getUserExperience, filteredCard ,step}) => {  

  const [inputValue, setInputValue] = useState('');
  let timeoutId = null;

  // 입력값 처리 함수 (디바운싱)
  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    // 이전 타이머가 있으면 클리어
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 새로운 타이머 설정 (500ms 후 요청)
    timeoutId = setTimeout(() => {
      getUserExperience(value); // 요청
    }, 500);
  };

  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard} step={step}/>          
        </div>
        <input value={inputValue} onChange={handleInputChange} /> 
        <Button nextStep={nextStep} prevStep={prevStep}/>
      </div>
      <div className="moon" style={{top:'5%' , left: '35%'}} ></div>
    </>
  )
}

export default UserExperience;