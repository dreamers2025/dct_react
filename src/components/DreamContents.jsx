import React from 'react'
import SelectedCard from './SelectedCard'
import './DreamContents.css'
//꿈 입력 페이지 컴포넌트
const DreamContents = ({ nextStep, filteredCard }) => {
  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard}/>          
        </div>
        <button className='next-btn' onClick={nextStep}>다음</button>
      </div>
      <div className="moon" style={{left: '15%'}}></div>
    </>
  )
}

export default DreamContents;