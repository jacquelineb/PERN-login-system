import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.scss';
import { AuthConsumer } from './AuthContext';

function NavBar() {
  return (
    /*
    <nav className={style.nav}>
      <Link className={style.link} to='/login'>
        LOG IN
      </Link>
      <Link className={style.link} to='/signup'>
        SIGN UP
      </Link>
    </nav>
    */

    /*
          {
            isAuth ? (
              <p>USERNAME</p>
            ) : (
              <>
                <Link className={style.link} to='/login'>
                  LOG IN
                </Link>
                <Link className={style.link} to='/signup'>
                  SIGN UP
                </Link>
              </>
            );
          }
          */
    <nav className={style.nav}>
      <AuthConsumer>
        {({ isAuth }) => (
          <>
            {isAuth ? (
              <p>USERNAME</p>
            ) : (
              <>
                <Link className={style.link} to='/login'>
                  LOG IN
                </Link>
                <Link className={style.link} to='/signup'>
                  SIGN UP
                </Link>
              </>
            )}
          </>
        )}
      </AuthConsumer>
    </nav>
  );
}

export default NavBar;
