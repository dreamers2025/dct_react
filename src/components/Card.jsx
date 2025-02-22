import React from "react";
import "./Card.css";
const Card = ({ src, name, role, description, issueQuestion, dreamQuestion, getCharacterData, onSelect, isSelected, step}) => {
  
  //카드 박스 클릭 시 해당 카드의 role 값 저장
  const bar = () => {
    getCharacterData(role);
    onSelect(role);
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
    </div>
  );
};

export default Card;
