import React, { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.scss';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../store/cart-context';

const HeaderCartButton = ({ onShow }) => {
  // bump 애니메이션을 제어하는 상태 변수
  const [isBump, setIsBump] = useState(false);

  const { button, icon, badge, bump } = styles;

  const { items } = useContext(CartContext);

  const numberOfCart = items.reduce((accu, item) => accu + item.amount, 0);

  useEffect(() => {
    // items -> 카트의 상태(Context API로 관리중)
    // items의 상태가 변경될 때마다 useEffect를 실행시키겠다.
    if (items.length === 0) return;
    setIsBump(true);

    // 다음 담기 애니메이션을 위해 bump 클래스 이름을 제거해야 한다.
    // 애니메이션 동작 시간까지는 기다려 주자.
    const timer = setTimeout(() => {
      setIsBump(false);
    }, 300);

    return () => {
      // cleanup 함수를 이용해서 0.3초 이내에 새로운 렌더링이 발생한다면
      // 기존의 timeout 함수를 취소하겠다. (애니메이션이 버벅거리는 것을 방지)
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={`${button} ${isBump ? bump : ''}`} onClick={onShow}>
      <span className={icon}>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className={badge}>{numberOfCart}</span>
    </button>
  );
};

export default HeaderCartButton;
