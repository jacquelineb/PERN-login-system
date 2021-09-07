import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.scss';

function NavBar({ isAuth, setIsAuth, currUser, setCurrUser }) {
  //console.log(isAuth);
  const dropdownItemsRef = useRef(null);
  const [dropdownIsActive, setDropdownIsActive] = useState(false);

  useEffect(() => {
    function handlePageClick(e) {
      // Clicking outside dropdown menu
      if (dropdownItemsRef.current && !dropdownItemsRef.current.contains(e.target)) {
        setDropdownIsActive(false);
      }
    }

    if (dropdownIsActive) {
      window.addEventListener('click', handlePageClick);
    }

    return () => {
      window.removeEventListener('click', handlePageClick);
    };
  }, [dropdownIsActive]);

  async function handleLogOut() {
    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.status === 200) {
      setIsAuth(false);
      setCurrUser(null);
    }

    window.location.reload();
  }

  return (
    <nav className={style.nav}>
      {isAuth ? (
        <div className={style.dropdown}>
          <button
            className={style.dropdownToggle}
            type='button'
            onClick={() => {
              setDropdownIsActive(!dropdownIsActive);
            }}
          >
            {currUser} ▼
          </button>

          <div
            ref={dropdownItemsRef}
            className={`${style.dropdownItems} ${!dropdownIsActive ? style.inactive : ''}`}
          >
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='#' onClick={handleLogOut}>
              Log out
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Link className={`${style.link} ${style.navHome}`} to='/'>
            HOME
          </Link>
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
