import React from "react";
import "./Card.css";
const Card = ({ src, name, role, description, issueQuestion, dreamQuestion, getCharacterData, onSelect, isSelected }) => {
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

      <p>{role}</p>
      <p>{description}</p>

      {/* 선택된 상태에서 후광 효과 추가 */}
      {isSelected && (
        <div className="glow"></div>
      )}
    </div>
  );
};

export default Card;
