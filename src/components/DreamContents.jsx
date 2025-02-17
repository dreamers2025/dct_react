import React from 'react'
import SelectedCard from './SelectedCard'
import './DreamContents.css'

//꿈 입력 페이지 컴포넌트 
const DreamContents = ({ nextStep, getUserDreamContents, filteredCard , payload}) => {
  console.log(payload);
  
  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard}/>          
        </div>
        <input onChange={ e => getUserDreamContents(e.target.value) }/>
        <button className='next-btn' onClick={nextStep}>다음</button>
      </div>
      <div className="moon" style={{left: '15%'}}></div>
    </>
  )
}

export default DreamContents;