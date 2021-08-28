import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.scss';
import { AuthContext } from './AuthContext';

function NavBar() {
  const authContext = useContext(AuthContext);

  return (
    <nav className={style.nav}>
      {authContext.isAuth ? (
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
    </nav>
  );
}

export default NavBar;
