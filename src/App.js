import React, { Component } from 'react';
import base from './re-base.js'
import Header from "./page/Header";
import Main from "./page/Main";
import {createMuiTheme, Grid, MuiThemeProvider} from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: {},
            logs: {},
        };
    }

    componentDidMount() {
        this.ref = base.syncState(`/current`,
            {
                context: this,
                state: 'current' // we want to sync books but not order
            });

        this.logRef = base.syncState(`/logs`,
            {
                context: this,
                state: 'logs' // we want to sync books but not order
            });
    }

    componentWillUnmount()
    {
        base.removeBinding(this.ref);
        base.removeBinding(this.logRef);
    }

    render() {
        const {current, logs}= this.state;
        const theme = createMuiTheme({
            palette: {
                common:{
                    black:"rgba(38, 38, 38, 1)",
                    white:"rgba(236, 236, 236, 1)"
                },
                background:{
                    paper:"rgba(255, 255, 255, 1)",
                    default:"rgba(180, 180, 180, 0.11)"
                },
                primary:{
                    light:"rgba(175, 175, 175, 1)",
                    main:"rgba(82, 74, 67, 1)",
                    dark:"rgba(51, 24, 0, 1)",
                    contrastText:"#fff"
                },
                secondary:{
                    light:"rgba(93, 146, 211, 1)",
                    main:"rgba(39, 125, 238, 1)",
                    dark:"rgba(28, 63, 106, 1)",
                    contrastText:"#fff"
                },
                error:{
                    light:"#e57373",
                    main:"#f44336",
                    dark:"#d32f2f",
                    contrastText:"#fff"
                },
                text:
                    {
                        primary:"rgba(0, 0, 0, 0.87)",
                        secondary:"rgba(0, 0, 0, 0.54)",
                        disabled:"rgba(0, 0, 0, 0.38)",
                        hint:"rgba(0, 0, 0, 0.38)"
                    }
            },
            typography: {
                // In Japanese the characters are usually larger.
                fontSize: 15,
                useNextVariants: true,
            },
        });
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <Grid container spacing={0} style={{margin: 0, width: '100%'}}>
                        <Switch>
                            <Route exact path="/" render={(props) =>
                                <React.Fragment>
                                        <Header current={current} logs={logs}/>
                                    <Grid item xs={12}>
                                        <Main current={current} logs={logs}/>
                                    </Grid>
                                </React.Fragment>
                            } />
                            <Route exact path="/log" render={(props) =>
                                <React.Fragment>
                                    <Grid item xs={12}>
                                        <Header current={current} logs={logs}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Main current={current} logs={logs}/>
                                    </Grid>
                                </React.Fragment>
                            } />
                        </Switch>
                    </Grid>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
