import React, { useState } from 'react';
import './CourseInput.css';
import Button from '../UI/Button';

const CourseInput = ({ onAdd }) => {
  const [enteredText, setEnteredText] = useState('');

  const textChangeHandler = (e) => {
    setEnteredText(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault(); // form 기능 중지
    onAdd(enteredText); // App.js에게 입력값 넘기기
    setEnteredText(''); // 입력창 비우기
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='form-control'>
        <label>나의 목표</label>
        <input type='text' value={enteredText} onChange={textChangeHandler} />
      </div>
      <Button type='submit'>목표 추가하기</Button>
    </form>
  );
};

export default CourseInput;
