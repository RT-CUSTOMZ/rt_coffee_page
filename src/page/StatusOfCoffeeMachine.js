import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core'
import Moment from "react-moment";

export default class StatusOfCoffeeMachine extends React.Component {
    render() {
        const {currentCoffee, coffeeMachineIsLatest, state_class, german_state_name} = this.props;

        return (
            <Paper className={'machines coffee_machine_paper' +((!coffeeMachineIsLatest)?' deactivated':'')}>
                <Grid item xl={6}>
                    <Typography variant="h3" gutterBottom className={((!coffeeMachineIsLatest)?'deactivated':'')}>
                        Kaffeemaschine
                    </Typography>
                    Status: <span className={state_class}>{german_state_name}</span> <br/>
                    Zuletzt gekocht um: <Moment locale="de" tz="Europe/Paris" format="LTS">{currentCoffee.time_coffee_machine}</Moment> <br/>
                    Das war: <Moment locale="de" tz="Europe/Paris" fromNow>{currentCoffee.time_coffee_machine}</Moment> <br/>
                </Grid>
            </Paper>
        );

    }
}