import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import style from './styles/App.module.scss';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    JSON.parse(localStorage.getItem('isAuthenticated')) ? true : false
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <NavBar isAuth={isAuthenticated} setIsAuth={setIsAuthenticated} />
        <div className={style.mainContent}>
          <Switch>
            <Route
              path='/login'
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to='/dashboard' />
                ) : (
                  <Login {...props} setIsAuth={setIsAuthenticated} />
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
            <Route path='/user/:username' component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
