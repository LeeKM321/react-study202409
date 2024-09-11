import React, { useState } from 'react';
import Card from '../../UI/Card';
import styles from './Login.module.css';
import ButtonComponent from '../../UI/Button';

const Login = () => {
  // 이메일 입력값을 저장
  const [enteredEmail, setEnteredEmail] = useState('');

  // 패스워드 입력값을 저장
  const [enteredPw, setEnteredPw] = useState('');

  // 이메일 입력이 정상적인지를 확인
  const [emailIsValid, setEmailIsValid] = useState();

  // 패스워드 입력도 정상적인지 확인
  const [pwIsValid, setPwIsValid] = useState();

  // 이메일, 패스워드가 둘 다 동시에 정상적인 상태인지 확인.
  const [formIsValid, setFormIsValid] = useState(false);

  // 이메일이 변경될 때마다 실행할 핸들러
  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);

    setFormIsValid(e.target.value.includes('@') && enteredPw.trim().length > 6);
  };

  // 비밀번호가 변경될 때마다 실행할 핸들러
  const passwordChangeHandler = (e) => {
    setEnteredPw(e.target.value);

    setFormIsValid(
      e.target.value.trim().length > 6 && enteredEmail.includes('@'),
    );
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
