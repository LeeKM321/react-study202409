import React, { useState } from 'react';
import CourseInput from './components/CourseGoals/CourseInput';
import CourseList from './components/CourseGoals/CourseList';
import './App.css';

const DUMMY_DATA = [
  {
    id: 'g1', // 랜덤값 Math.random().toString()
    text: '리액트 컴포넌트 스타일 마스터하기',
  },
  {
    id: 'g2',
    text: 'UI 프로그래밍 삽고수 되기',
  },
];

const App = () => {
  const [goals, setGoals] = useState(DUMMY_DATA);

  // Input에게 전달할 함수
  const addGoalHandler = (text) => {
    const newGoal = {
      id: Math.random().toString(), // DB Table의 PK로 처리가 될 것.
      text,
    };
    // 상태변수(배열) 변경
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  // 삭제 이벤트 핸들러를 CourseItem까지 내려보내야 함.
  // 결국 삭제라는 것은 배열의 상태가 변한다는 거고, 그 상태는 App.js가 관리하는 중.
  const deleteGoalHandler = (id) => {
    console.log('선택된 목표의 id: ', id);
    const updateGoals = [...goals]; // 상태 배열 그대로 복사해서 가져옴.
    const index = updateGoals.findIndex((goal) => goal.id === id);
    /*
    for (let i = 0; i <= updateGoals.length; i++) {
      if (updateGoals[i].id === id) {
        updateGoals.splice(i, 1);
        break;
      }
    }
    */
    setGoals(updateGoals);
  };

  // CourseList 조건부 렌더링
  let listContent = (
    <p style={{ color: 'red', fontSize: '2em', textAlign: 'center' }}>
      목표를 등록해 주세요!
    </p>
  );

  if (goals.length > 0) {
    listContent = <CourseList items={goals} onDelete={deleteGoalHandler} />;
  }

  return (
    <div>
      <section id='goal-form'>
        <CourseInput onAdd={addGoalHandler} />
      </section>
      <section id='goals'>{listContent}</section>
    </div>
  );
};

export default App;
