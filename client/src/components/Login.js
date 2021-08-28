import React from 'react';
import styles from '../styles/form.module.scss';
import { Link } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';

function Login() {
  async function handleLogin(e) {
    e.preventDefault();
    console.log('logging in');
    const loginCredentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    /*
    const postData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const response = await fetch('http://192.168.1.77:5000/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(postData),
    });

    console.log(response.status);
    console.log(await response.json());
    */
    console.log('end of logging in');
  }

  async function handleLogOut() {
    const response = await fetch('http://192.168.1.77:5000/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });
    console.log(await response.json());
  }

  return (
    <div className={styles.formContainer}>
      <h1>Log in</h1>
      <AuthConsumer>
        {({ logIn, logOut }) => (
          <>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                const loginCredentials = {
                  email: e.target.email.value,
                  password: e.target.password.value,
                };

                logIn(loginCredentials);
              }}
            >
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

            <button type='button' onClick={logOut}>
              test logout
            </button>
          </>
        )}
      </AuthConsumer>
    </div>
  );
  /*
  return (
    <div className={styles.formContainer}>
      <h1>Log in</h1>
      <form className={styles.form} onSubmit={handleLogin}>
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
  */
}

export default Login;
