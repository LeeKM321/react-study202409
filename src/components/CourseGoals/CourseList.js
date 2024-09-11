import React from 'react';
import './CourseList.css';
import CourseItem from './CourseItem';

const CourseList = ({ items, onDelete }) => {
  return (
    <ul className='goal-list'>
      {items.map((item) => {
        return <CourseItem key={item.id} item={item} onDelete={onDelete} />;
      })}
    </ul>
  );
};

export default CourseList;
