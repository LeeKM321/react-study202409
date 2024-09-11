import React from 'react';
import styled from 'styled-components';
// import './Button.css';

const Button = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active {
    background: #ac0e77;
    border-color: #ac0e77;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
  }
`;

// 반복되는 태그가 다양한 속성을 가지게 된다면
// 컴포넌트로 분할해서 속성값을 일괄적으로 처리할 수 있게 하자.
// const Button = ({ type, onclick, children }) => {
//   return (
//     <button className='button' type={type} onClick={onclick}>
//       {children}
//     </button>
//   );
// };

export default Button;
