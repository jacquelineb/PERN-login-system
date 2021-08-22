import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import '../styles/Signup.css';
import styles from '../styles/form.module.scss';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup(e) {
    e.preventDefault();
    const postData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const response = await fetch('http://192.168.1.77:5000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(postData),
    });

    console.log(await response.json());
  }

  return (
    <div className={styles.formContainer}>
      <h1>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSignup}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            title='Must contain at least one number, one uppercase and lowercase letter, and be 8 or more characters in length'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className='pwCheckbox'
            type='checkbox'
            id='show-password'
            name='show-password'
            onChange={(e) => {
              const passwordInput = document.querySelector('input[name="password"]');
              if (e.target.checked) {
                passwordInput.type = 'text';
              } else {
                passwordInput.type = 'password';
              }
            }}
          />
          <label htmlFor='show-password'>
            <span>Show password</span>
          </label>

          <p>
            Password must be at least 8 characters long, containing at least one number, one
            uppercase letter, and one lowercase letter.
          </p>
        </div>
        <div>
          <button type='submit'>Sign up</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to='/login'>Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
