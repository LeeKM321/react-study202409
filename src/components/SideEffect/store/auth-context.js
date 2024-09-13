import React from 'react';

// 로그인 상태 변수를 관리할 컨텍스트
const AuthContext = React.createContext({
  isLoggedIn: false,
  // 함수도 context에 저장해서 제공이 가능하다.
  // 초기값은 onLogout이라는 데이터가 함수 형태라는 것만 지정.
  onLogout: () => {},
});

export default AuthContext;
