import React from "react";
import "./ShowResults.css";
import SelectedCard from './SelectedCard'

const ShowResults = ({ filteredCard, responseResults }) => {
  console.log(responseResults);

  return (
    <div className="result-container">
      <div className="result-window">
        <div className='imgbox'> {/* 캐릭터 */} 
            <SelectedCard filteredCard={filteredCard} />          
        </div>
        <div className="result-content">
          <p>해몽 : {responseResults.content}</p> {/* 해몽 */}
          <p>요약 : {responseResults.summary}</p> {/* 요약 */}
        </div>
        <button className="close-btn">닫기</button>
      </div>
    </div>
  );
};

export default ShowResults;
