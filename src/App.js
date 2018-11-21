import React, { Component } from 'react';
import base from './re-base.js'
import Header from "./page/Header";
import Main from "./page/Main";
import {Grid} from '@material-ui/core'
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
        return (
            <div className="App">
                <Grid container spacing={16}>
                    <Switch>
                        <Route exact path="/" render={(props) =>
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
            </div>
        );
    }
}

export default App;
