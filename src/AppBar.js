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

  // looks like all this is doing is putting the string 'left' in a few places, so if we do this we can avoid mapping over an array of one item
  const anchor = 'left';
  return <>
      <Button className="menu-button" onClick={() => setDrawer(true)}>
        Menu
      </Button>
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
    </>
}
