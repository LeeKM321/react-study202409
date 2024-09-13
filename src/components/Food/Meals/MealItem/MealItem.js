import React, { useContext } from 'react';
import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';
import CartContext from '../../store/cart-context';

const MealItem = ({ id, price, description, name }) => {
  const { meal, description: desc, price: priceStyle } = styles;

  const { addItem } = useContext(CartContext);

  // 금액 자리수 표시
  const formatPrice = new Intl.NumberFormat('ko-KR').format(price);

  // MealItemForm에게 넘길 함수 -> 수량 받아와야 돼요.
  const addToCartHandler = (amount) => {
    const newItem = {
      id,
      name,
      price: +price,
      amount: +amount,
    };
    addItem(newItem);
  };

  return (
    <li className={meal}>
      <div>
        <h3>{name}</h3>
        <div className={desc}>{description}</div>
        <div className={priceStyle}>{formatPrice}원</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
