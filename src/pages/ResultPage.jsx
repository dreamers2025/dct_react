import React from 'react'
import './ResultPage.css'
import SelectedCard from '../components/SelectedCard'

const ResultPage = ({filteredCard , payload}) => {

    //테스트
  console.log(payload);  //서버에 보낼 데이터 객체
  const ResultData = fetch(`http://localhost:8999/api/gemini/dream-interpretation?interpreterType=${payload.interpreterType}&experience=4${payload.experience}&dreamContent=${payload.dreamContent}`);
  console.log(ResultData);
  
  
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