import React, { useEffect, useState } from 'react';
import Card from '../../UI/Card';
import styles from './Login.module.css';
import ButtonComponent from '../../UI/Button';

const Login = ({ onLogin }) => {
  // 이메일 입력값을 저장
  const [enteredEmail, setEnteredEmail] = useState('');

  // 패스워드 입력값을 저장
  const [enteredPw, setEnteredPw] = useState('');

  // 이메일 입력이 정상적인지를 확인
  const [emailIsValid, setEmailIsValid] = useState(true);

  // 패스워드 입력도 정상적인지 확인
  const [pwIsValid, setPwIsValid] = useState(true);

  // 이메일, 패스워드가 둘 다 동시에 정상적인 상태인지 확인.
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log('useEffect called in Login.js!');

    // setTimeout을 사용해서 유효성 검증을 1초 뒤에 실행하도록 작성.
    // 1초 이내에 새로운 입력값이 들어온다면? -> 상태 변경 -> useEffect가 다시 실행됨.
    const timer = setTimeout(() => {
      console.log('setTimeout 호출!');
      setFormIsValid(enteredEmail.includes('@') && enteredPw.trim().length > 6);
    }, 1000);

    // cleanup 함수 - 컴포넌트가 업데이트 되거나 없어지기 직전에 실행.
    // 사용자가 1초 이내에 추가 입력 -> 상태 변경(컴포넌트 업데이트) -> 위에 예약한 timer를 취소해라.
    return () => {
      clearTimeout(timer);
    };
    // 의존성 배열에 상태변수를 넣어주면 그 상태변수가 변경될 때마다 useEffect가 재실행됨.
  }, [enteredEmail, enteredPw]);

  // 이메일이 변경될 때마다 실행할 핸들러
  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  // 비밀번호가 변경될 때마다 실행할 핸들러
  const passwordChangeHandler = (e) => {
    setEnteredPw(e.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPwIsValid(enteredPw.trim().length > 6);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit 동작함!');
    onLogin(enteredEmail, enteredPw);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${!emailIsValid ? styles.invalid : ''}`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler} // blur는 focus의 반대.
          />
        </div>
        <div
          className={`${styles.control} ${!pwIsValid ? styles.invalid : ''}`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={enteredPw}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <ButtonComponent
            type='submit'
            className={styles.btn}
            disabled={!formIsValid} // button은 disabled를 통해 비활성화 기능 구현. true면 비활성, false면 활성
          >
            Login
          </ButtonComponent>
        </div>
      </form>
    </Card>
  );
};

export default Login;
