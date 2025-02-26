import React, { useState } from "react";
import "./ShowResults.css";
import SelectedCard from './SelectedCard'

//폰트어썸 (자물쇠 아이콘 사용)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons'; // 자물쇠 아이콘
import { useAuth } from "./auth/AuthProvider";

const ShowResults = ({ filteredCard, responseResults, stepToHome }) => {

  const {user}=useAuth(); // 로그인 유저 정보
  console.log(user); 

  // const accessToken = localStorage.getItem("accessToken");
  // console.log(accessToken);
  
  
  // const[userGrade,setUserGrade] = useState('userGrade');  //유료 무료 구분에 따라 변경

  return (
    <div className="result-container">
      <div className="result-window">
        <div className='imgbox'> {/* 캐릭터 */} 
            <SelectedCard filteredCard={filteredCard} />          
        </div>
        <div className="result-content">
          <p className="content-title">해몽</p>

          <div className="blur-wrapper">  {/* user의 등급이 null이라면 자물쇠로 해몽 내용 블러 처리 */}
            {user === null ? (
              <>
                <p className="interpretation-content">{responseResults.gemini.content}</p>
                <div className="lock-icon">
                  <FontAwesomeIcon icon={faLock} size="3x" />
                </div>
              </>
            ) : (
              <p>{responseResults.gemini.content}</p>
            )}
          </div>
            
          <p className="content-title">요약</p>
          <p>{responseResults.gemini.summary}</p> {/* 요약 */}
        </div>
        <button className="again-btn" onClick={stepToHome}>다시하기</button>
      </div>
    </div>
  );
};

export default ShowResults;
