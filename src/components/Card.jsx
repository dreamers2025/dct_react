import React from "react";
import './Card.css'
const Card = ({src,name,role,description}) => {

    const onSubmit = () => {
       console.log(src);
       console.log(name);
       console.log(role);                    
    };

  return (
    <div className="imgcard" onClick={onSubmit}>
      
      <div className="imgframe">
        <img src={src} alt={name} />
      </div> 

      <p>{role}</p> 
      <p>{description}</p>

    </div>
  );
};

export default Card;
