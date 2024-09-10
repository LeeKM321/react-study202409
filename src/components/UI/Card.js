import React from 'react';

const Card = ({ children, className }) => {
  const madeClass = 'card ' + className;
  return <div className={madeClass}>{children}</div>;
};

export default Card;
