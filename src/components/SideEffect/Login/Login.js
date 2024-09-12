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
const emailReducer = (state, action) => {
  console.log('email reducer called!!');
  console.log('state: ', state);
  console.log('action: ', action);

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@'),
    };
  } else if (action.type === 'INPUT_VALIDATE') {
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    };
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
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  // 패스워드 입력값을 저장
  const [enteredPw, setEnteredPw] = useState('');

  // 패스워드 입력도 정상적인지 확인
  const [pwIsValid, setPwIsValid] = useState(true);

  // 이메일, 패스워드가 둘 다 동시에 정상적인 상태인지 확인.
  const [formIsValid, setFormIsValid] = useState(false);

  // 기존의 email 상태변수를 제거함.
  // 상태값이 필요하다면 -> reducer가 제공한 상태값을 활용.
  // 내가 지정한 상태값에서 필요한 값들을 뽑아서 사용.
  const { value: emailValue, isvalid: emailIsValid } = emailState;

  useEffect(() => {
    console.log('useEffect called in Login.js!');

    // setTimeout을 사용해서 유효성 검증을 1초 뒤에 실행하도록 작성.
    // 1초 이내에 새로운 입력값이 들어온다면? -> 상태 변경 -> useEffect가 다시 실행됨.
    const timer = setTimeout(() => {
      console.log('setTimeout 호출!');
      setFormIsValid(emailIsValid && enteredPw.trim().length > 6);
    }, 1000);

    // cleanup 함수 - 컴포넌트가 업데이트 되거나 없어지기 직전에 실행.
    // 사용자가 1초 이내에 추가 입력 -> 상태 변경(컴포넌트 업데이트) -> 위에 예약한 timer를 취소해라.
    return () => {
      clearTimeout(timer);
    };
    // 의존성 배열에 상태변수를 넣어주면 그 상태변수가 변경될 때마다 useEffect가 재실행됨.
  }, [emailValue, enteredPw]);

  // 이메일이 변경될 때마다 실행할 핸들러
  const emailChangeHandler = (e) => {
    // reducer의 상태 변경은 dispatch 함수를 통해서 처리
    // dispatch함수의 매개값 객체의 key는 정해진 것이 아닌, reducer 함수에서 구분하기 위해 붙여주는 이름.
    // 프로퍼티의 key와 value는 자유롭게 줄 수 있습니다. (정해진 게 아님!)
    dispatchEmail({
      type: 'USER_INPUT',
      val: e.target.value,
    });
  };

  // 비밀번호가 변경될 때마다 실행할 핸들러
  const passwordChangeHandler = (e) => {
    setEnteredPw(e.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'INPUT_VALIDATE',
    });
  };

  const validatePasswordHandler = () => {
    setPwIsValid(enteredPw.trim().length > 6);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit 동작함!');
    onLogin(emailValue, enteredPw);
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
            value={emailValue}
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
