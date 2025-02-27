import React, { useState } from 'react';
import SelectedCard from './SelectedCard'
import './DreamContents.css'
import Button from './Button'
//꿈 입력 페이지 컴포넌트 
const DreamContents = ({ nextStep, prevStep, getUserDreamContents, filteredCard, step, payload}) => {
  console.log(payload);  
  
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
    
        // 새로운 타이머 설정 (500ms 후 요청) //사용자 입력이 없으면 5초 후에 요청보냄
        timeoutId = setTimeout(() => {
          getUserDreamContents(value); // 요청
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
      <div className="moon" style={{left: '15%'}}></div>
    </>
  )
}

export default DreamContents;