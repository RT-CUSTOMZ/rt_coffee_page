import React, { Component } from 'react';
import base from './re-base.js'
import Header from "./page/Header";
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

                <Switch>
                    <Route exact path="/" render={(props) =>
                        <React.Fragment>
                            <Header current={current} logs={logs}/>
                        </React.Fragment>
                    } />
                </Switch>
            </div>
        );
    }
}

export default App;
