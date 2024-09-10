import React from 'react';
import './Button.css';

// 반복되는 태그가 다양한 속성을 가지게 된다면
// 컴포넌트로 분할해서 속성값을 일괄적으로 처리할 수 있게 하자.
const Button = ({ type, onclick, children }) => {
  return (
    <button type={type} onClick={onclick}>
      {children}
    </button>
  );
};

export default Button;
