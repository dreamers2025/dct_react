import React from 'react'
//사용자가 선택한 캐릭터카드를 생성
const SelectedCard = ({ filteredCard ,step}) => {   
  return (
    <div className="imgcard">
      <div className="imgframe">
        <img src={filteredCard[0].imageSrc} alt={filteredCard[0].name} />
      </div>      
      {step === 2 && <p>{filteredCard[0].issueQuestion}</p>}      
      {step === 3 && <p>{filteredCard[0].dreamQuestion}</p>}  
    </div>
  )
}

export default SelectedCard;