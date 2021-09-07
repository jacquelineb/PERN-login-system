import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import style from './styles/App.module.scss';
import LandingPage from './components/LandingPage';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    JSON.parse(localStorage.getItem('isAuthenticated')) ? true : false
  );

  const [currentUser, setCurrentUser] = useState(() => {
    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    return currentUser ? currentUser : null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('currentUser', currentUser);
  }, [isAuthenticated, currentUser]);

  return (
    <>
      <Router>
        <NavBar
          isAuth={isAuthenticated}
          setIsAuth={setIsAuthenticated}
          currUser={currentUser}
          setCurrUser={setCurrentUser}
        />
        <div className={style.mainContent}>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route
              path='/login'
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to='/dashboard' />
                ) : (
                  <Login
                    {...props}
                    setIsAuth={setIsAuthenticated}
                    setCurrUser={setCurrentUser}
                  />
                )
              }
            />
            <Route
              path='/dashboard'
              render={(props) => (isAuthenticated ? <Dashboard /> : <Redirect to='/login' />)}
            />
            <Route
              path='/signup'
              render={(props) => (isAuthenticated ? <Redirect to='/dashboard' /> : <Signup />)}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
