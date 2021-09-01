import React from 'react';
import styles from '../styles/form.module.scss';
import { Link } from 'react-router-dom';

function Login({ setIsAuth }) {
  async function handleLogIn(e) {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (response.status === 200) {
      setIsAuth(true);
    }
  }

  async function handleLogOut() {
    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.status === 200) {
      setIsAuth(false);
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1>Log in</h1>
      <form className={styles.form} onSubmit={handleLogIn}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' required />
        </div>
        <div>
          <button type='submit'>Log in</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </p>
      <button type='button' onClick={handleLogOut}>
        test logout
      </button>
    </div>
  );
}

export default Login;
