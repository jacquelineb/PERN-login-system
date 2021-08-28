import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import style from './styles/App.module.scss';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <NavBar />
          <div className={style.mainContent}>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/user/:username' component={UserProfile} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
