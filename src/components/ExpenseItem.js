import React from 'react';
import './ExpenseItem.css';

// 전달되는 props는 객체로 온다. 디스트럭처링을 통해 쪼개 받을 수 있다.
const ExpenseItem = ({ title, price, date }) => {
  // 날짜 포맷팅 변환 함수 정의
  const makeFormattedDate = () => {};

  return (
    <div className='expense-item'>
      <div>{date.getFullYear()}</div>
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>{price}원</div>
      </div>
    </div>
  );
};

export default ExpenseItem;
