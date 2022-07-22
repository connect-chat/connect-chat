import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDataContext } from './DataProvider';
import AuthPage from './AuthPage';
import ChatPage from './ChatPage';
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';
import AppBar from './AppBar';
import './App.css';

export default function App() {
  const { user } = useDataContext();


  return (
    <Router>
      <div className='hunt'>
        <AppBar />

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
