import React, { useState } from 'react';
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

// 전달되는 props는 객체로 온다. 디스트럭처링을 통해 쪼개 받을 수 있다.
const ExpenseItem = ({ title, price, date }) => {
  // 값이 변경되어 화면에 반영되어야 하는 값들은
  // useState 훅을 통해 상태변수로 관리해야 한다.
  // (훅: React에서 직접 코드 작성 없이 다양한 기능을 사용할 수 있게 도와주는 라이브러리)

  // useState(상태변수의 초기값) -> 배열을 리턴합니다.
  // 첫번째 요소는 관리할 상태값
  // 두번째 요소는 상태값을 변경해주는 setter 함수가 리턴됨. (디스트럭쳐링으로 한번에 받음.)
  const [itemTitle, setItemTitle] = useState(title);

  const clickHandler = () => {
    // 상태값의 변경은 반드시 setter로만 변경해야 합니다.
    setItemTitle('메롱메롱');
  };

  return (
    <Card className='circle'>
      <div className='expense-item'>
        <ExpenseDate date={date} />
        <div className='expense-item__description'>
          <h2>{itemTitle}</h2>
          <div className='expense-item__price'>{price}원</div>
        </div>
      </div>
      <button id='btn1' onClick={clickHandler}>
        수정
      </button>
      <button id='btn2' onClick={() => alert('삭제 버튼 클릭!')}>
        삭제
      </button>
    </Card>
  );
};

export default ExpenseItem;
