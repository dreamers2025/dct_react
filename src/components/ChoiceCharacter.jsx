import React, { useState } from 'react'
import './ChoiceCharacter.css'
import Card from './Card'

//캐릭터 선택 컴포넌트

//리액트에서 이미지 src 설정 -> 이미지 주소 import
const ChoiceCharacter = ({ nextStep, prevStep, getCharacterData ,cardData, step }) => {  

  //캐릭터 선택이 안됐을시 버튼 잠금하는 상태변수
  const [selectedRole, setSelectedRole] = useState(null);

  //캐릭터 선택시 selectedRole에 해당 캐릭터 role 세팅
  const foo = (role) => setSelectedRole(role);

  //캐릭터 카드 생성
  //isSelected == 카드가 리렌더링될때 selectedRole과 해당 카드의 role이 같으면 style을 부여한다
  return (
    <>
      <div className='Choice-container'>  {/* 뒤에 렌더링 되는 컨테이너들과 스타일이 달라서 클래스 이름 수정 */}
        <div className='imgbox'>
          {cardData.map((card)=>(
            <Card
            key={card.id}
            src={card.imageSrc}
            name={card.name}
            role={card.role}
            description={card.description} 
            issueQuestion={card.issueQuestion}
            dreamQuestion={card.dreamQuestion}
            
            getCharacterData={getCharacterData}   
            onSelect={foo}  
            isSelected={card.role === selectedRole}    
            step = {step}          
            />
            ))}        
        </div>
        <div className='btn-box'>
          <button className='prev-btn' onClick={prevStep} >이전</button>
          <button className='next-btn' onClick={nextStep} disabled={selectedRole === null}>다음</button>
        </div>        
      </div>
      <div className="moon" style={{top:'5%' , right: '35%'}} ></div>
    </>
  )
}

export default ChoiceCharacter;