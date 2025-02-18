import React from 'react'
import './UserExperience.css'
import SelectedCard from './SelectedCard'

//최근 고민거리 컴포넌트
const UserExperience = ({ nextStep,prevStep, getUserExperience, filteredCard }) => {  

  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard}/>          
        </div>
        <input onChange={e => getUserExperience(e.target.value)}/> 
        <div className='btn-box'>
          <button className='prev-btn' onClick={prevStep} >이전</button>
          <button className='next-btn' onClick={nextStep} >다음</button>
        </div>
      </div>
      <div className="moon" style={{top:'5%' , left: '35%'}} ></div>
    </>
  )
}

export default UserExperience;