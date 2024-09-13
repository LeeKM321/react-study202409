import React, { useEffect, useReducer, useState } from 'react';
import Card from '../../UI/Card';
import styles from './Login.module.css';
import ButtonComponent from '../../UI/Button';

// 리듀서 함수 선언
/*
   이 컴포넌트에서 사용하는 모든 상태와 상태 변경을 중앙 제어하는 함수.
   컴포넌트 내부 데이터를 사용하지 않고 상태에만 집중하기 때문에
   컴포넌트 바깥쪽에 선언하는 것이 일반적입니다.
   
   param1 - state: 변경 전의 상태값
   param2 - action: dispatch함수(상태 변경 등의 행동)가 전달한 상태 변경 객체
   return: 관리할 상태값들을 반환
 */
const formReducer = (state, action) => {
  console.log('email reducer called!!');
  console.log('state: ', state);
  console.log('action: ', action);

  switch (action.type) {
    case 'EMAIL_INPUT':
      return {
        ...state,
        email: { ...state.email, value: action.val },
      };
    case 'PW_INPUT':
      return {
        ...state,
        pw: { ...state.pw, value: action.val },
      };
    case 'VALIDATE_EMAIL':
      return {
        ...state,
        email: { ...state.email, isValid: state.email.value.includes('@') },
      };
    case 'VALIDATE_PW':
      return {
        ...state,
        pw: { ...state.pw, isValid: state.pw.value.trim().length > 6 },
      };
    case 'VALIDATE_FORM':
      return {
        ...state,
        formIsValid: state.email.isValid && state.pw.isValid,
      };

    default:
      return state;
  }
};

const Login = ({ onLogin }) => {
  // email reducer 사용하기
  /*
     param1 - reducer function: 위에서 만든 리듀서 함수
     param2 - initial state: 초기 상태값
     return1 - 이메일 관련 상태변수
     return2 - dispatch함수: 상태를 변경할 수 있는 함수
   */
  const [formState, dispatchForm] = useReducer(formReducer, {
    email: { value: '', isValid: null },
    pw: { value: '', isValid: null },
    formIsValid: false,
  });

  const { email: emailState, pw: pwState } = formState;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('setTimeout 호출!');
      dispatchForm({ type: 'VALIDATE_FORM' });
    }, 500);

    // cleanup 함수 - 컴포넌트가 업데이트 되거나 없어지기 직전에 실행.
    // 사용자가 1초 이내에 추가 입력 -> 상태 변경(컴포넌트 업데이트) -> 위에 예약한 timer를 취소해라.
    return () => {
      clearTimeout(timer);
    };
    // 의존성 배열에 상태변수를 넣어주면 그 상태변수가 변경될 때마다 useEffect가 재실행됨.
  }, [emailState.value, pwState.value, emailState.isValid, pwState.isValid]);

  // 이메일이 변경될 때마다 실행할 핸들러
  const emailChangeHandler = (e) => {
    // reducer의 상태 변경은 dispatch 함수를 통해서 처리
    // dispatch함수의 매개값 객체의 key는 정해진 것이 아닌, reducer 함수에서 구분하기 위해 붙여주는 이름.
    // 프로퍼티의 key와 value는 자유롭게 줄 수 있습니다. (정해진 게 아님!)
    dispatchForm({
      type: 'EMAIL_INPUT',
      val: e.target.value,
    });
  };

  // 비밀번호가 변경될 때마다 실행할 핸들러
  const passwordChangeHandler = (e) => {
    dispatchForm({
      type: 'PW_INPUT',
      val: e.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: 'VALIDATE_EMAIL' });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: 'VALIDATE_PW' });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(emailState.value, pwState.value);
  };

  console.log('최신의 상태: ', formState);

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${!emailState.isValid ? styles.invalid : ''}`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler} // blur는 focus의 반대.
          />
        </div>
        <div
          className={`${styles.control} ${!pwState.isValid ? styles.invalid : ''}`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={pwState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <ButtonComponent
            type='submit'
            className={styles.btn}
            disabled={!formState.formIsValid}
          >
            Login
          </ButtonComponent>
        </div>
      </form>
    </Card>
  );
};

export default Login;
