import React , { useState } from 'react'
import './ResultPage.css'
import SelectedCard from '../components/SelectedCard'


const ResultPage = ({filteredCard , payload}) => {    
  
    const handleClick = async (e) => {
        try {
          // fetch 요청 (await을 사용하여 비동기 처리)
          const response = await fetch(
            `http://localhost:8999/api/gemini/dream-interpretation?interpreterType=${payload.interpreterType}&experience=4${payload.experience}&dreamContent=${payload.dreamContent}`
          );
      
          // 응답이 정상인지 확인
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          // 응답을 JSON 형식으로 변환
          const responseData = await response.json();
      
          // 응답 데이터 출력
          console.log(responseData);
        } catch (error) {
          // 오류 처리
          console.error('Error fetching data:', error);
        }
      }

  return (
    <>
      <div className='container'>
        <div className='imgbox'>          
            <SelectedCard filteredCard={filteredCard} />          
        </div> 
        <button className="result-btn" onClick={handleClick}>결과보기</button>
      </div>      
    </>
  )
}

export default ResultPage;