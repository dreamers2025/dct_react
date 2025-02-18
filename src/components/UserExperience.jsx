import React from 'react'
import './UserExperience.css'
import SelectedCard from './SelectedCard'
import Button from './Button'
//최근 고민거리 컴포넌트
const UserExperience = ({ nextStep,prevStep, getUserExperience, filteredCard }) => {  

  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard}/>          
        </div>
        <input onChange={e => getUserExperience(e.target.value)}/> 
        <Button nextStep={nextStep} prevStep={prevStep}/>
      </div>
      <div className="moon" style={{top:'5%' , left: '35%'}} ></div>
    </>
  )
}

export default UserExperience;