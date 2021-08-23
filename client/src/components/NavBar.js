import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.scss';

function NavBar() {
  return (
    <nav className={style.nav}>
      <Link className={style.link} to='/login'>
        LOG IN
      </Link>
      <Link className={style.link} to='/signup'>
        SIGN UP
      </Link>
    </nav>
  );
}

export default NavBar;
