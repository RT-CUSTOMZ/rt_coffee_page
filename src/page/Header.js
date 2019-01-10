import React from 'react';
import {AppBar, Toolbar, Typography, Button, Hidden, IconButton, List, ListItem, ListItemText, Drawer, ListItemIcon} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EventNoteIcon from '@material-ui/icons/EventNote';

export default class Header extends React.Component {
    state = {
        left: false,

};

toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

render() {

        const sideList = (
            <div>
                <List>
                    <ListItem component="a" button href={'/'}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>

                    <ListItem component="a" button href={'/statistics'}>
                        <ListItemIcon>
                            <NotesIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Statistik'} />
                    </ListItem>

                    <ListItem component="a" button href={'/logs'}>
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>

                        <ListItemText primary={'Log'} />
                    </ListItem>

                    <ListItem component="a" button href={'/messaging'}>
                        <ListItemIcon>
                            <NotificationsActiveIcon />
                        </ListItemIcon>

                        <ListItemText primary={'Messaging'} />
                    </ListItem>
                </List>
            </div>
        );
        return(
            <AppBar position="static" color="default">

                    <Toolbar>
                        <Typography variant="h6" color="inherit" style={{ marginRight: 20}}>
                            Kaffee Status
                        </Typography>
                        <Hidden xsDown>
                            <Button color="primary" href={'/'}>
                                Dashboard
                            </Button>
                            <Button color="primary" href={'/statistics'}>
                                Statistik
                            </Button>
                            <Button color="primary" href={'/logs'}>
                                Log
                            </Button>
                            <Button color="primary" href={'/messaging'}>
                                Messaging
                            </Button>
                        </Hidden>
                        <Hidden smUp>
                            <IconButton
                                className={"menubutton"}
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.toggleDrawer('left', true)}>
                                <MenuIcon />
                            </IconButton>

                            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer('left', false)}
                                    onKeyDown={this.toggleDrawer('left', false)}
                                >
                                    {sideList}
                                </div>
                            </Drawer>
                        </Hidden>
                    </Toolbar>
            </AppBar>
        )
    }
}