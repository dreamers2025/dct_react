import React from 'react'
//사용자가 선택한 캐릭터카드를 생성
const SelectedCard = ({ filteredCard ,step}) => {   

  //p태그 스타일 변경경
  const pStyle = {
    width: '400px',
    wordWrap: 'break-word', // 텍스트가 너무 길어지지 않도록 자동 줄 바꿈    
  };

  return (
    <div className="imgcard">
      <div className="imgframe">
        <img src={filteredCard[0].imageSrc} alt={filteredCard[0].name} />
      </div>      
      {step === 2 && <p style={pStyle}>{filteredCard[0].issueQuestion}</p>}      
      {step === 3 && <p style={pStyle}>{filteredCard[0].dreamQuestion}</p>}  
    </div>
  )
}

export default SelectedCard;