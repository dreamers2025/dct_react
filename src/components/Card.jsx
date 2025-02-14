import React from "react";
import "./Card.css";
const Card = ({ src, name, role, description, getCharacterData, onSelect, isSelected }) => {
  const bar = () => {
    getCharacterData(role);
    onSelect(role);
  };

  return (
    <div
      className="imgcard"
      onClick={bar}
      style={{
        border: isSelected ? '4px solid red' : 'none'
      }}
    >
      <div className="imgframe">
        <img src={src} alt={name} />
      </div>

      <p>{role}</p>
      <p>{description}</p>
    </div>
  );
};

export default Card;
