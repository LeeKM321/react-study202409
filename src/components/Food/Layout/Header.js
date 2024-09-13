import React from 'react';
import styles from './Header.module.scss';
import mealsImage from '../../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = ({ onShowCart }) => {
  const { header, 'main-image': mainImage } = styles;
  return (
    <>
      <header className={header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShow={onShowCart} />
        <button>Cart</button>
      </header>
      <div className={mainImage}>
        <img src={mealsImage} alt='Looks very delicious meals' />
      </div>
    </>
  );
};

export default Header;
