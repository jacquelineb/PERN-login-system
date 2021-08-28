import React, { useContext } from 'react';
import styles from '../styles/form.module.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Login() {
  const authContext = useContext(AuthContext);

  function handleLogIn(e) {
    e.preventDefault();
    const loginCredentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    authContext.logIn(loginCredentials);
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
      <button type='button' onClick={authContext.logOut}>
        test logout
      </button>
    </div>
  );
}

export default Login;
