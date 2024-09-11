import React from 'react';
import './CourseItem.css';

const CourseItem = ({ item, onDelete }) => {
  return (
    <li className='goal-item' onClick={() => onDelete(item.id)}>
      {item.text}
    </li>
  );
};

export default CourseItem;
