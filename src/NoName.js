import React from 'react';
import Card from './components/UI/Card';

const NoName = (props) => {
  console.log('NoName Component!');
  console.log('props: ', props);

  return (
    <Card className='rectangle'>
      <div>
        {props.children}
        Hello React!
      </div>
    </Card>
  );
};

export default NoName;
