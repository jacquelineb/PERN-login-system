import React, { useState } from 'react';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isAuth, setIsAuth] = useState(false);
  /* don't just initialize to false. check if a user is already logged in.
    right now if you log in and then refresh the page, it will show the version
    of the navbar for non-logged-in users. but console will show that a user is
    still logged in
  */

  //function login(credentials) {}

  async function logIn(credentials) {
    const response = await fetch('http://192.168.1.77:5000/auth/login', {
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
    console.log(await response.json());
  }

  async function logOut() {
    const response = await fetch('http://192.168.1.77:5000/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.status === 200) {
      setIsAuth(false);
    }
    console.log(await response.json());
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        logIn: logIn,
        logOut: logOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
