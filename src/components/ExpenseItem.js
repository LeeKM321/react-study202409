import React from 'react';
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Card from './UI/Card';

// 전달되는 props는 객체로 온다. 디스트럭처링을 통해 쪼개 받을 수 있다.
const ExpenseItem = ({ title, price, date }) => {
  return (
    <Card className='circle'>
      <div className='expense-item'>
        <ExpenseDate date={date} />
        <div className='expense-item__description'>
          <h2>{title}</h2>
          <div className='expense-item__price'>{price}원</div>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItem;
