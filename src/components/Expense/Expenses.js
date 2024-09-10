import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';

const Expenses = ({ expenses }) => {
  // 선택된 연도값 상태 관리
  const [filteredYear, setFilteredYear] = useState(
    new Date().getFullYear().toString(),
  );

  // 자식 컴포넌트인 ExpenseFilter에게 내려줄 함수
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  // 고차함수 filter를 따로 분리 -> 필터링 결과가 비었을 경우 없다고 얘기하기 위해서.
  const filteredItem = expenses.filter(
    (item) => item.date.getFullYear().toString() === filteredYear,
  );

  // 조건부 렌더링을 위한 변수 -> 기본값으로 없다고 깔아놓음.
  let expenseContent = <p>아직 등록된 지출이 없습니다.</p>;

  // 혹시 필터링 된 결과가 하나라도 존재한다면?
  // 필터링 된 결과를 ExpenseItem으로 맵핑하자. (원래 우리가 하던 일.)
  if (filteredItem.length > 0) {
    expenseContent = filteredItem.map((item) => (
      <ExpenseItem
        key={item.id} // 반복문을 통해 같은 컴포넌트를 표현할 때, 각각을 구분할 수 있게 해 주는 prop
        title={item.title}
        price={item.price}
        date={item.date}
      />
    ));
  }

  return (
    <Card className='expenses'>
      <ExpenseFilter onChangeFilter={filterChangeHandler} />
      {expenseContent}
    </Card>
  );
};

export default Expenses;
