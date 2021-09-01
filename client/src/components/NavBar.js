import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.scss';

function NavBar({ isAuth, setIsAuth }) {
  console.log(isAuth);

  function handleButtonClick(e) {
    console.log(e.currentTarget.parentNode);
    e.currentTarget.nextSibling.classList.add('show');
  }

  async function handleLogOut() {
    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.status === 200) {
      setIsAuth(false);
    }

    window.location.reload();
  }

  return (
    <nav className={style.nav}>
      {isAuth ? (
        <div className={style.dropdown}>
          <button type='button' onClick={handleButtonClick}>
            USERNAME ▼
          </button>
          <div className={style.dropdownItems}>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='#'>
              <span onClick={handleLogOut}>Log out</span>
            </Link>
          </div>
        </div>
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
