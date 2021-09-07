import React from 'react';
import styles from '../styles/form.module.scss';
import { Link } from 'react-router-dom';

function Login({ logIn }) {
  return (
    <div className={styles.formContainer}>
      <h1>Log in</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          const credentials = {
            email: e.target.email.value,
            password: e.target.password.value,
          };

          logIn(credentials);
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
    </div>
  );
}

export default Login;
