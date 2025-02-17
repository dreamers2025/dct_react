import React from 'react'
import "./SelectedCard.css";
//사용자가 선택한 캐릭터카드를 생성
const SelectedCard = ({ filteredCard }) => {   
  return (
    <div className="imgcard">
      <div className="imgframe">
        <img src={filteredCard[0].imageSrc} alt={filteredCard[0].name} />
      </div>
      <p>{filteredCard[0].role}</p>
      <p>{filteredCard[0].description}</p>      
    </div>
  )
}

export default SelectedCard;