import React, { useEffect, useState } from 'react';
import MainHeader from './components/SideEffect/MainHeader/MainHeader';
import Login from './components/SideEffect/Login/Login';
import Home from './components/SideEffect/Home/Home';

const App = () => {
  // 로그인 상태를 기억하는 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 화면이 리렌더링 될 때 localStorage를 확인해서
  // 현재 login-flag 데이터가 존재하는지 확인.
  console.log('로그인 검사 수행!');

  // 지정한 상태 변수에 따라 렌더링의 여부를 제어할 수 있는 hook.
  useEffect(() => {
    console.log('useEffect called!');

    const storedLoginFlag = localStorage.getItem('login-flag');
    if (storedLoginFlag === '1') {
      setIsLoggedIn(true);
    }
  }, []);
  // 의존성 배열: useEffect가 실행되어야 하는 트리거 변수.
  // 배열 안에 상태 변수를 지정하면, 해당 변수의 값이 변할 때마다 useEffect가 실행되고,
  // 만약 빈 배열을 전달하면 최초 렌더링 과정에서 단 한번만 실행.

  // 서버로 로그인을 요청하는 함수. (나중에 비동기 방식으로 실제 요청이 들어갈 것.)
  const loginHandler = (email, password) => {
    if (email === 'abc1234@naver.com' && password === 'aaa1111') {
      // 로그인 성공
      // 로그인을 했다는 증거로 상태값 변경 및 브라우저에 로그인 값을 1로 표현해서 저장.
      setIsLoggedIn(true);
      // 브라우저가 제공하는 저장소. 새로고침이나 브라우저를 종료해도 데이터가 계속 유지됨.
      localStorage.setItem('login-flag', '1');
    } else {
      // 로그인 실패
      alert('로그인 실패입니다.');
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('login-flag');
    setIsLoggedIn(false);
  };

  return (
    <>
      <MainHeader isLoggedIn={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {isLoggedIn && <Home />}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
      </main>
    </>
  );
};

export default App;
