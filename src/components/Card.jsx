import React from "react";
import "./Card.css";
import { useAuth } from "./auth/AuthProvider";


const Card = ({ src, name, role, description, issueQuestion, dreamQuestion, getCharacterData, onSelect, isSelected, step}) => {
  
  const{user} = useAuth();

  //카드 박스 클릭 시 유저의 등급에 따라 카드선택 여부 결정 후 데이터 저장
  const bar = () => {
    if (user === null) { //비회원이라면 스님 , 기독교인 카드만 선택 가능 (나머지 카드는 선택불가 alert으로 알리기)
      if(role === 'MONK' || role === 'CHRISTIAN'){
        console.log("비회원입니다.");   
        getCharacterData(role); //카드 박스 클릭 시 해당 카드의 role 값 저장
        onSelect(role);     
      } else {
        alert("비회원은 선택할수없는 카드입니다.");      
      }      
    }else if (user.usergrade === "free") { //무료회원은 독설가 , 래퍼도 선택 가능
      if(role === 'MONK' || role === 'CHRISTIAN' || role === 'VITRIOLIST' || role ==='RAPPER'){
        console.log("무료 회원입니다.");   
        getCharacterData(role); //카드 박스 클릭 시 해당 카드의 role 값 저장
        onSelect(role);     
      } else {
        alert("무료회원은 선택할수없는 카드입니다.");      
      }
    }else {
      console.log("유료회원은 모두 선택 가능합니다.");      
      getCharacterData(role); //카드 박스 클릭 시 해당 카드의 role 값 저장
      onSelect(role);
    }    
  };

  return (
    <div
      className="imgcard"
      onClick={bar}
      style={{
        position: 'relative',  // 후광 효과를 적용할 위치를 잡기 위해 사용
      }}
    >
      <div className="imgframe">
        <img src={src} alt={name} />
      </div>      
      {/* step1에서는 캐릭터 선택시(isSelected로 구별) class를 부여하여 반짝이는 스타일 추가 */}
      {step === 1 && ( 
        <p className={isSelected ? "textglow" : ""}>
          {description}
        </p>
      )}       
      {step === 2 && <p>{issueQuestion}</p>}
      {step === 3 && <p>{dreamQuestion}</p>}
      

      {/* 선택된 상태에서 후광 효과 추가 */}
      {isSelected && (
        <div className="glow"></div>
      )}

      {/* free 등급 카드 */}
      {(role === 'VITRIOLIST' || role === 'RAPPER') && (
        <div className="card-grade free-grade-card">
          <p>FREE</p>
        </div>
      )}

      {/* premium 등급 카드 */}
      {(role === 'POSSESSEDBABY' || role === 'MANSOUR') && (
        <div className="card-grade premium-grade-card">
          <p>PREMIUM</p>
        </div>
      )}
    </div>
  );
};

export default Card;
