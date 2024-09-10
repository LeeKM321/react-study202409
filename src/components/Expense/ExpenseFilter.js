import React from 'react';
import './ExpenseFilter.css';

const ExpenseFilter = ({ onChangeFilter }) => {
  const dropdownChangeHandler = (e) => {
    const selectedYear = e.target.value;
    // 선택된 년도를 필터링할 곳으로 보내자. -> 부모 -> 함수를 전달받아야 한다.
    onChangeFilter(selectedYear);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select onChange={dropdownChangeHandler}>
          <option value='2024'>2024</option>
          <option value='2023'>2023</option>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
