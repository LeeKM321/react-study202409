import React from 'react';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';

const Expenses = ({ expenses }) => {
  return (
    <div className='expenses'>
      {expenses.map((item) => (
        <ExpenseItem
          key={item.id} // 반복문을 통해 같은 컴포넌트를 표현할 때, 각각을 구분할 수 있게 해 주는 prop
          title={item.title}
          price={item.price}
          date={item.date}
        />
      ))}
    </div>
  );
};

export default Expenses;
