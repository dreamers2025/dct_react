import React, { useState } from "react";
import "./ShowResults.css";
import SelectedCard from './SelectedCard'

//폰트어썸 (자물쇠 아이콘 사용)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons'; // 자물쇠 아이콘

const ShowResults = ({ filteredCard, responseResults }) => {
  console.log(responseResults);

  // const[userGrade,setUserGrade] = useState('userGrade');  //유료 무료 구분에 따라 변경

  return (
    <div className="result-container">
      <div className="result-window">
        <div className='imgbox'> {/* 캐릭터 */} 
            <SelectedCard filteredCard={filteredCard} />          
        </div>
        <div className="result-content">
          <p className="content-title">해몽</p>
          <div className="blur-wrapper">  {/* 무료회원 블러 처리 */}
            <p className="interpretation-content">{responseResults.gemini.content}</p> {/* 해몽 */}
            <div className="lock-icon"> {/* 자물쇠 */}
              <FontAwesomeIcon icon={faLock} size="3x" />  
            </div>
          </div>          
          <p className="content-title">요약</p>
          <p>{responseResults.gemini.summary}</p> {/* 요약 */}
        </div>
        <button className="close-btn">닫기</button>
      </div>
    </div>
  );
};

export default ShowResults;
