import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onSave }) => {
  const [userInput, setUserInput] = useState({
    title: '',
    price: '',
    date: '',
  });

  const titleChangeHandler = (e) => {
    // useState의 setter는 콜백 함수를 매개값으로 받을 수 있음.
    // 콜백의 매개값으로는 이전 상태값이 전달됨.
    // 이전 상태에서 title을 제외한 나머지는 그대로 복사하고, title 프로퍼티 값만 변경.
    setUserInput((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  const priceChangeHandler = (e) => {
    setUserInput((prev) => {
      return { ...prev, price: e.target.value };
    });
  };

  const dateChangeHandler = (e) => {
    setUserInput((prev) => {
      return { ...prev, date: e.target.value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault(); // submit 중지

    // 입력받은 모든 정보를 App.js로 보내자.
    // 어떻게? -> App.js가 내려준 함수를 이곳에서 호출!
    onSave({
      ...userInput,
      date: new Date(userInput.date),
    });

    // 입력창 리셋
    setUserInput({
      title: '',
      price: '',
      date: '',
    });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={userInput.title}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Price</label>
          <input
            type='number'
            min='100'
            step='100'
            onChange={priceChangeHandler}
            value={userInput.price}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2025-12-31'
            onChange={dateChangeHandler}
            value={userInput.date}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
