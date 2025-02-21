import React from 'react'
import './ResultPage.css'
import SelectedCard from '../components/SelectedCard'

const ResultPage = ({filteredCard , payload}) => {
    
  console.log(payload);  
  
  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard} />          
        </div> 
      </div>      
    </>
  )
}

export default ResultPage;