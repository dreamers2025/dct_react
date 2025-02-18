import React from 'react'
import SelectedCard from './SelectedCard'
import './DreamContents.css'

//꿈 입력 페이지 컴포넌트 
const DreamContents = ({ nextStep, prevStep, getUserDreamContents, filteredCard , payload}) => {
  console.log(payload);
  
  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard}/>          
        </div>
        <input onChange={ e => getUserDreamContents(e.target.value) }/>
        <div className='btn-box'>
          <button className='prev-btn' onClick={prevStep} >이전</button>
          <button className='next-btn' onClick={nextStep} >다음</button>
        </div>
      </div>
      <div className="moon" style={{left: '15%'}}></div>
    </>
  )
}

export default DreamContents;