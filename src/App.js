import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { logout } from './services/fetch-utils';
import { useDataContext } from './DataProvider';
import AuthPage from './AuthPage';
import ChatPage from './ChatPage';
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';
// import { AppBar } from '@mui/material';
import './App.css';

export default function App() {
  const { user, setUser, setUserName, setSign } = useDataContext();

  async function handleLogout() {
    await logout();
    setUser(null);
    setUserName(null);
    setSign(null);
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {
              user &&
              <li>
                <Link to="/chat">Chat</Link>
              </li>
            }
            {
              user &&
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            }
            {
              user &&
              <li>
                <Link to='/about'>about</Link>
              </li>
            }
            {
              user &&
              <li>
                <button onClick={handleLogout}>logout</button>
              </li>
            }
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/chat" /> : <AuthPage />}
          </Route>
          <Route exact path="/chat">
            {!user ? <Redirect to="/" /> : <ChatPage />}
          </Route>
          <Route exact path="/profile">
            {!user ? <Redirect to="/" /> : <ProfilePage />}
          </Route>
          <Route exact path='/about'>
            {!user ? <Redirect to='/' /> : <AboutPage />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
