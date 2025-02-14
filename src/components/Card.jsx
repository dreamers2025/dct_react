import React from "react";

const Card = ({src}) => {
  return (
    <div className="imgcard">
      <img src={src} alt="" />
    </div>
  );
};

export default Card;
