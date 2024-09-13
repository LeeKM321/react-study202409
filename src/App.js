import React from 'react';
import Header from './components/Food/Layout/Header';
import Meals from './components/Food/Meals/Meals';
import Cart from './components/Food/Cart/Cart';

const App = () => {
  return (
    <>
      <Cart />
      <Header />
      <Meals />
    </>
  );
};

export default App;
