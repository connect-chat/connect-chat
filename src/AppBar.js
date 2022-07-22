import * as React from 'react';
import { Link } from 'react-router-dom';
import { logout } from './services/fetch-utils';
import { Drawer, Button, ListItem } from '@mui/material';
import { useDataContext } from './DataProvider';

export default function ButtonAppBar() {
  const [drawer, setDrawer] = React.useState(false);
  const { setUser, setUserName, setSign } = useDataContext();

  async function handleLogout() {
    await logout();
    setUser(null);
    setUserName(null);
    setSign(null);
  }

  return ['left'].map((anchor) => (
    <React.Fragment key={anchor}>
      <Button onClick={() => setDrawer(true)}>{anchor}</Button>
      <Drawer anchor={anchor} open={drawer} onClose={() => setDrawer(false)}>
        <ListItem>
          <Link to="/chat">Chat</Link>
        </ListItem>
        <ListItem>
          <Link to="/profile">Profile</Link>
        </ListItem>
        <ListItem>
          <Link to="/about">About</Link>
        </ListItem>
        <ListItem>
          <button onClick={handleLogout}>Logout</button>
        </ListItem>
      </Drawer>
    </React.Fragment>
  ));
}
