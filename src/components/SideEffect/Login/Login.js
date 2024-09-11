import React from 'react';
import Card from '../../UI/Card';
import styles from './Login.module.css';
import ButtonComponent from '../../UI/Button';

const Login = () => {
  return (
    <Card className={styles.login}>
      <form>
        <div className={`${styles.control} `}>
          <label htmlFor='email'>E-Mail</label>
          <input type='email' id='email' />
        </div>
        <div className={`${styles.control} `}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' />
        </div>
        <div className={styles.actions}>
          <ButtonComponent type='submit' className={styles.btn}>
            Login
          </ButtonComponent>
        </div>
      </form>
    </Card>
  );
};

export default Login;
