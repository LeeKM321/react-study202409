import React from 'react';
import styles from './Card.module.css';

/*
   서로 다른 두 개의 css 파일에 동일한 이름의 css 클래스가 정의되어 있다면
   두 스타일의 충돌이 발생할 수 있습니다. (우선순위에 의해 어느 한 스타일이 동작 x)
   이런 것들을 해결하기 위해 CSS Module을 사용.
   고유한 클래스명을 통해 css 클래스명이 서로 중첩되는 것을 방지.
   전역 스타일에 지정하면 편합니다. (전역 스타일의 충돌 및 오염 방지)
 */
const Card = ({ children, className }) => {
  // const madeClass = 'card ' + className;
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
