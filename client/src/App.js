import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import style from './styles/App.module.scss';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className={style.mainContent}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
