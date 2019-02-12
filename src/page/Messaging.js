import React from 'react';
import {Switch, FormControlLabel, FormGroup, Grid} from '@material-ui/core';
import Typography from "@material-ui/core/es/Typography/Typography";

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


    componentDidMount() {
        this.setState({ 'ReceiveMessages': window.localStorage.getItem('ReceiveMessages') === 'true',
                              'ReceiveBrewingMessages': window.localStorage.getItem('ReceiveBrewingMessages') === 'true',
                              'ReceiveReadyMessages':window.localStorage.getItem('ReceiveReadyMessages') === 'true'
        });
    }

    render() {
        const { token, message} = this.props;
        let tokenElement = "No token!";
        let messageElement = "no message";

        if (null !== token) {
            tokenElement = token;
        }
        if (null !== message) {
            messageElement = message.type;
        }


        return (
            <Grid container item>
                <Grid item xs={12}>
                    <Typography variant={"h5"}>Firebase Cloud Messaging</Typography><br/>
                </Grid>
                <Grid item xs={12}>{tokenElement}</Grid><br/>
                <Grid item xs={12}>{messageElement}</Grid><br/>
                <Grid item xs={12}>
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
                                disabled={false === this.state.ReceiveMessages}
                            />
                        } label="Receive Coffee Brewing Messages" />
                        <FormControlLabel control={
                            <Switch
                                checked={this.state.ReceiveReadyMessages}
                                onChange={this.handleChange('ReceiveReadyMessages')}
                                disabled={false === this.state.ReceiveMessages}
                            />
                        } label="Receive Coffee Ready Messages" />
                    </FormGroup>
                </Grid>
            </Grid>

        )
    }
}