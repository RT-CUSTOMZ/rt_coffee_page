import React from 'react';
import {Grid, Paper} from '@material-ui/core'
import CoffeeCup from "./CoffeeCup";

import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/de';

export default class Main extends React.Component {
    render() {
        const {current} = this.props;

        let currentCoffee = Object.keys(current).reduce(function (total, currentValue) {
            let entry = {
                state : current[currentValue].state,
                fill_level : current[currentValue].fill_level,
                time: current[currentValue].time,
            }

            return entry;
        },0);

        return (
            <Grid container justify="center" spacing={16}>
                <Grid item>
                    <Paper>
                        <CoffeeCup current={current}/>
                        {currentCoffee.fill_level} <br/>
                        {currentCoffee.state} <br/>
                        <Moment locale="de" tz="Europe/Paris" format="LTS">{currentCoffee.time}</Moment> <br/>
                        <Moment locale="de" tz="Europe/Paris" fromNow>{currentCoffee.time}</Moment> <br/>
                    </Paper>
                </Grid>
            </Grid>
        );

    }
}