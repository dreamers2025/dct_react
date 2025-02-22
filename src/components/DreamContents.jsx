import React from 'react'
import SelectedCard from './SelectedCard'
import './DreamContents.css'
import Button from './Button'
//꿈 입력 페이지 컴포넌트 
const DreamContents = ({ nextStep, prevStep, getUserDreamContents, filteredCard, step, payload}) => {
  console.log(payload);
  
  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard} step={step}/>          
        </div>
        <input onChange={ e => getUserDreamContents(e.target.value) }/>
        <Button nextStep={nextStep} prevStep={prevStep}/>
      </div>
      <div className="moon" style={{left: '15%'}}></div>
    </>
  )
}

export default DreamContents;