import React from 'react';
import classes from './Navigation.module.css';
import AuthContext from '../store/auth-context';

const Navigation = ({ onLogout }) => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <nav className={classes.nav}>
            {context.isLoggedIn && (
              <ul>
                <li>
                  <a href='#'>MyPage</a>
                </li>
                <li>
                  <a href='#'>Admin</a>
                </li>
                <li>
                  <button onClick={() => onLogout()}>Logout</button>
                </li>
              </ul>
            )}
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
