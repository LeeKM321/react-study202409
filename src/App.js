import React, { useState } from 'react';
import CourseInput from './components/CourseGoals/CourseInput';
import CourseList from './components/CourseGoals/CourseList';
import './App.css';

const DUMMY_DATA = [
  {
    id: 'g1',
    text: '리액트 컴포넌트 스타일 마스터하기',
  },
  {
    id: 'g2',
    text: 'UI 프로그래밍 삽고수 되기',
  },
];

const App = () => {
  const [goals, setGoals] = useState(DUMMY_DATA);

  // CourseList 조건부 렌더링
  let listContent = (
    <p style={{ color: 'red', fontSize: '2em', textAlign: 'center' }}>
      목표를 등록해 주세요!
    </p>
  );

  if (goals.length > 0) {
    listContent = <CourseList items={goals} />;
  }

  return (
    <div>
      <section id='goal-form'>
        <CourseInput />
      </section>
      <section id='goals'>{listContent}</section>
    </div>
  );
};

export default App;
