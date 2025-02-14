import React from "react";
import './Card.css'
const Card = ({src,name,role,description, getCharacterData}) => {    
    
   
  return (
    <div className="imgcard" onClick={()=>getCharacterData(role)}>
      
      <div className="imgframe">
        <img src={src} alt={name} />
      </div> 

      <p>{role}</p> 
      <p>{description}</p>

    </div>
  );
};

export default Card;
