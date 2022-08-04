/**
 I was surprised to see just how little code there really is in this app--and that's a good thing! You have a lot of features crammed into a few files, without so much obfuscation that it would be difficult to maintain. I generally judge code quality based on how I'd feel if I were asked to maintain the codebase, and in this case, I'd say I'd have and easy and fun time adding features to this app and fixing bugs as they develop. Very nice work--I have a few comments scattered about, but this really isn't too different from how I would have approached this project.
 */

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
        {/* this AppBar keeps your App.js nice and clean. so smooth looking! */}
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
