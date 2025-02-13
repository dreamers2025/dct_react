import React, { useState } from "react";
import './Startpage.css'
import StartComponent from "../components/StartComponent";


const StartPage = () => {

  //상태값을 처리하는 함수
  let [renderTag,setRenderTag] = useState(0);
  console.log('renderTag:', renderTag);

  return (    
      
      <StartComponent renderTag = { renderTag }/>
    
  );
};

export default StartPage;
