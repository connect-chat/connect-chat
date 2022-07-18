import { BrowserRouter as Router,
  Switch, 
  Route,
  Link,
  Redirect } from 'react-router-dom';
import { logout } from './services/fetch-utils';
import { useDataContext } from './DataProvider';
import AuthPage from './AuthPage';
import ChatPage from './ChatPage';
import ProfilePage from './ProfilePage';
import './App.css';

export default function App() {

  const { user, setUser } = useDataContext();
  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Auth</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>logout</button>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/auth" /> : <AuthPage />}
          </Route>
          <Route exact path="/chat">
            {!user ? <Redirect to="/" /> : <ChatPage />}
          </Route>
          <Route exact path="/profile">
            {!user ? <Redirect to="/" /> : <ProfilePage />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}