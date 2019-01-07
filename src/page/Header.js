import React from 'react';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';

export default class Header extends React.Component {
    render() {
        return(
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Kaffee Status
                    </Typography>
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
                </Toolbar>
            </AppBar>
        )
    }
}