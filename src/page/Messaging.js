import React from 'react';
import {Switch, FormControlLabel, FormGroup} from '@material-ui/core';

export default class Messaging extends React.Component {
    state = {
        ReceiveMessages: true,
        ReceiveBrewingMessages: false,
        ReceiveReadyMessages: true,
    };

    handleChange = name => event => {

        this.setState({ [name]: event.target.checked }, ()=>{
            console.log('Updating ' + name + ' in Local Storage to ' + this.state[name]);
            window.localStorage.setItem(name, this.state[name]);
        });
    };


  /*  componentDidMount() {
        this.setState({ ReceiveMessages: window.localStorage.getItem('ReceiveMessages'),
                              // 'ReceiveBrewingMessages': window.localStorage.getItem('ReceiveBrewingMessages'),
                              // 'ReceiveReadyMessages': window.localStorage.getItem('ReceiveReadyMessages')
        });
    }*/

    render() {
        const { token, message } = this.props;
        let tokenElement = "No token!";
        let messageElement = "no message";

        if (null !== token) {
            tokenElement = token;
        }
        if (null !== message) {
            messageElement = message.type;
        }


        return (
            <div>
                <h3>Firebase Cloud Messaging</h3>
                <div>{tokenElement}</div>
                <div>{messageElement}</div>
                <FormGroup >
                    <FormControlLabel control={
                        <Switch
                            checked={this.state.ReceiveMessages}
                            onChange={this.handleChange('ReceiveMessages')}
                        />
                    } label="Receive Messages" />


                    <FormControlLabel control={
                        <Switch
                            checked={this.state.ReceiveBrewingMessages}
                            onChange={this.handleChange('ReceiveBrewingMessages')}
                        />
                    } label="Receive Coffee Brewing Messages" />
                    <FormControlLabel control={
                        <Switch
                            checked={this.state.ReceiveBrewingMessages}
                            onChange={this.handleChange('ReceiveBrewingMessages')}
                        />
                    } label="Receive Coffee Brewing Messages" />

                    <FormControlLabel control={
                        <Switch
                            checked={this.state.ReceiveReadyMessages}
                            onChange={this.handleChange('ReceiveReadyMessages')}
                        />
                    } label="Receive Coffee Ready Messages" />
                </FormGroup>
            </div>

        )
    }
}