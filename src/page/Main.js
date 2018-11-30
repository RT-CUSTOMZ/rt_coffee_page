import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core'
import CoffeeCup from "./CoffeeCup";
import "./Main.css";

import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/de';

export default class Main extends React.Component {
    render() {
        const {current} = this.props;

        let currentCoffee = Object.keys(current).reduce(function (total, currentValue) {
            let entry = {
                state : current[currentValue].coffee_machine.state,
                time_coffee_machine : current[currentValue].coffee_machine.time,
                fill_level : current[currentValue].scale.fill_level,
                time_fill_level: current[currentValue].scale.time,
            }

            return entry;
        },0);

        let moment = require('moment');
        let timestamp_fillevel = moment(currentCoffee.time_fill_level).format("x");
        let timestamp_coffeemachine = moment(currentCoffee.time_coffee_machine).format("x");

        let last_status = "no";
        let german_state_name = "no"
        let warning = "no";



        if(currentCoffee.state === "coffee_ready"){
            german_state_name = "Kaffee ist fertig";
        }else{
            german_state_name = "Kaffee wird gekocht";
        }

        let fill_level_class;
        let state_class;
        let scaleIsLatest;
        let coffeeMachineIsLatest;

        if (timestamp_coffeemachine < timestamp_fillevel) {
            scaleIsLatest = 1;
            coffeeMachineIsLatest = 0;
        }else{
            scaleIsLatest = 0;
            coffeeMachineIsLatest = 1;
        }
        if (scaleIsLatest) {
            if(currentCoffee.fill_level >= 90){
                fill_level_class = "font_FillLevel_100";
            } else if(currentCoffee.fill_level >= 55){
                fill_level_class = "font_FillLevel_66";
            } else if(currentCoffee.fill_level >= 20){
                fill_level_class = "font_FillLevel_33";
            } else if(currentCoffee.fill_level < 20){
                fill_level_class = "font_FillLevel_0";
            }
        } else {
            if(currentCoffee.state === "coffee_ready")
                state_class = 'font_coffeeReady';
            else
                state_class = 'font_coffeeBrewing'
        }

        if (scaleIsLatest) {
            last_status = "Waage";
            if(currentCoffee.fill_level <= 20){
                warning = "Der Kaffee ist fast leer! Bitte neuen kochen.";
            } else {
                warning = "";
            }
        } else {
            last_status = "Kaffeemaschine";
            warning = "Bitte die Kaffeekanne auf die Waage stellen.";
        }

        return (
            <div>
                <Grid container justify="center" spacing={32} alignItems={'center'}>
                    <Paper className={'machines'}>
                        <Grid item xl={6}>
                            <CoffeeCup current={current}/>
                        </Grid>
                        <Grid item xl={6}>
                            Der letzte Status kam von der <Typography variant="body2" gutterBottom><b>{last_status}</b>.</Typography> <br/>
                            <Typography variant="caption" gutterBottom><span className={'warning'}>{warning}</span></Typography>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid container justify="space-around" spacing={32} alignItems="stretch">
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
                    <Paper className={'machines scale_paper' +((!scaleIsLatest)?' deactivated':'')  }>
                        <Grid item xl={6}>
                            <Typography variant="h3" gutterBottom className={((!scaleIsLatest)?'deactivated':'')}>
                                Waage
                            </Typography>
                            Füllstand Kaffeekanne:<span className={fill_level_class}>{currentCoffee.fill_level}%</span> <br/>
                            Zuletzt gewogen um: <Moment locale="de" tz="Europe/Paris" format="LTS">{currentCoffee.time_fill_level}</Moment> <br/>
                            Das war: <Moment locale="de" tz="Europe/Paris" fromNow>{currentCoffee.time_fill_level}</Moment> <br/>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );

    }
}