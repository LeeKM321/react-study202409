import React, { useReducer } from 'react';
import CartContext from './cart-context';

// 리듀서 함수 정의: 여러가지 복잡한 상태관리를 중앙 집중화
// state: 업데이트 전의 최신 상태
// action: 어떤 업데이트를 하는지에 대한 정보와 필요값들이 들어 있음. (dispatch에 의해 전달)
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // 기존 카트에 이미 등록된 메뉴인지 아닌지의 여부부터 확인해야 할 것 같음!
    // findIndex를 사용해서, 새롭게 추가할 item의 id와 기존 상품의 id를 비교해서 idx 찾기.
    const idx = state.items.findIndex(
      (oldItem) => action.item.id === oldItem.id,
    );

    // 기존 카트 아이템 -> 마지막에 최신 배열 상태를 리턴해야 함.
    // 기존 상태 배열을 복사해서 조작한 후에 마지막에 updateItems로 반영해서 return.
    const existingItems = [...state.items]; // 기존 배열을 복사
    const prevCartItem = existingItems[idx]; // 위에서 찾은 인덱스로 요소를 하나만 지목

    let updateItems;

    if (idx === -1) {
      // 신규 아이템
      // 기존 상태가 가지고 있는 카트 항목에 새로운 항목을 추가.
      updateItems = [...state.items, action.item];
    } else {
      //   state.items[idx].amount++; -> 바깥화면에서는 수량이 꼭 하나만 올라가지 않는다!
      prevCartItem.amount += action.item.amount;
      updateItems = [...existingItems];
    }

    const updatePrice =
      state.totalPrice + action.item.price * action.item.amount;

    // 변경된 상태를 객체 형태로 리턴 -> cartState로 전달됨.
    return {
      items: updateItems,
      totalPrice: updatePrice,
    };
  } else if (action.type === 'REMOVE') {
    // 최신 상태의 배열을 복사
    const existingItems = [...state.items];
    // id가 일치하는 대상의 인덱스를 찾자.
    const idx = state.items.findIndex((oldItem) => action.id === oldItem.id);

    const updatePrice = state.totalPrice - existingItems[idx].price;

    // 업데이트 직전에 수량이 1이라면 제거 대상입니다.
    if (existingItems[idx].amount === 1) {
      existingItems.splice(idx, 1);
    } else {
      existingItems[idx].amount--;
    }

    return {
      items: existingItems,
      totalPrice: updatePrice,
    };
  }
};

// App.js에서 CartContext를 바로 provide 할 수도 있지만,
// Cart에 관련된 기능이 App.js에 있으면 기능별로 컴포넌트를 구분할 수 없기 때문에
// CartProvider를 생성해서 provider에 관련한 기능을 몰아주겠다.
const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    totalPrice: 0,
  });

  // 컨슈머들이 실제로 받아서 사용할 객체를 따로 정의
  // 밑에 value에 직접 써도 되는데, 길어질 까봐 따로 뺐어요.
  const cartContextData = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: (item) => {
      dispatchCartAction({
        type: 'ADD',
        item,
      });
    },
    removeItem: (id) => {
      dispatchCartAction({
        type: 'REMOVE',
        id,
      });
    },
  };

  return (
    <CartContext.Provider value={cartContextData}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
