import React from 'react';
import {CircularProgress, Grid, Paper, Typography} from '@material-ui/core';
import StatusOfCoffeeMachine from "../StatusOfCoffeeMachine";
import StatusOfScale from "../StatusOfScale";
import "../Main.css";

import 'moment-timezone';
import 'moment/locale/de';
import CoffeeCup from "../CoffeeCup";

export default class CompressedLayout extends React.Component {
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

        let last_event;
        if(timestamp_coffeemachine>timestamp_fillevel){
            last_event = german_state_name + "!";
        } else {
            last_event = currentCoffee.fill_level + "%";
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
        let duration = moment.duration(moment().diff(currentCoffee.time_coffee_machine)).asHours();
        if (scaleIsLatest||duration>4) {
            if(duration>4){
                fill_level_class = "font_FillLevel_0";
            } else {
                if(currentCoffee.fill_level >= 90){
                    fill_level_class = "font_FillLevel_100";
                } else if(currentCoffee.fill_level >= 55){
                    fill_level_class = "font_FillLevel_66";
                } else if(currentCoffee.fill_level >= 20){
                    fill_level_class = "font_FillLevel_33";
                } else if(currentCoffee.fill_level < 20){
                    fill_level_class = "font_FillLevel_0";
                }
            }
        } else {
            if(currentCoffee.state === "coffee_ready") {
                state_class = 'font_coffeeReady';
            } else {
                state_class = 'font_coffeeBrewing'
            }

        }
        if(scaleIsLatest){

            last_status = "Waage";
            if(currentCoffee.fill_level <= 20){
                warning = "Der Kaffee ist fast leer! Bitte neuen kochen.";
            } else {
                warning = "";
            }
            if(duration>4){
                warning = "Der Kaffee ist alt! Bitte neuen kochen.";
            }
        } else {
            last_status = "Kaffeemaschine";
            warning = "Bitte die Kaffeekanne auf die Waage stellen.";
            if(duration>4){
                warning = "Der Kaffee ist alt! Bitte neuen kochen.";
            }
        }

        let Icon = "";
        let CoffeeColor = "";

        if (timestamp_coffeemachine < timestamp_fillevel) {
            if(currentCoffee.fill_level >= 90){
                Icon = "icon-coffee_cup_100";
                CoffeeColor = "coffeeBackground_FillLevel_100";
            } else if(currentCoffee.fill_level >= 55){
                Icon = "icon-coffee_cup_66";
                CoffeeColor = "coffeeBackground_FillLevel_66";
            } else if(currentCoffee.fill_level >= 20){
                Icon = "icon-coffee_cup_33";
                CoffeeColor = "coffeeBackground_FillLevel_33";
            } else if(currentCoffee.fill_level < 20){
                Icon = "icon-coffee_cup_0";
                CoffeeColor = "coffeeBackground_FillLevel_0";
            }
        }
        else
        {
            if (currentCoffee.state === "coffee_brewing") {
                Icon = "icon-coffee_machine_0";
                CoffeeColor = "coffeeBackground_coffeeBrewing"
            }
            if (currentCoffee.state === "coffee_ready") {
                Icon = "icon-coffee_machine_100";
                CoffeeColor = "coffeeBackground_coffeeReady"
            }
        }

        return (

            <Paper className={'machines '+ CoffeeColor}>
                <Grid container justify={'center'} alignItems={'center'}>
                    <Grid item xs={4}>
                        <CoffeeCup Icon={Icon}/>
                    </Grid>
                    <Grid item xs={1}>
                        <span className={'warning'}>{last_event}</span>
                        {last_event==="coffee_brewing"?<CircularProgress />:""}
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="subtitle1" gutterBottom>
                            <span className={'warning'}>{warning}</span><br/>
                            Der letzte Status kam von der <b>{last_status}</b>.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid>
                    {scaleIsLatest?
                        <StatusOfScale scaleIsLatest={scaleIsLatest}
                                       fill_level_class={fill_level_class}
                                       currentCoffee={currentCoffee}/>:
                        <StatusOfCoffeeMachine coffeeMachineIsLatest={coffeeMachineIsLatest}
                                               currentCoffee={currentCoffee}
                                               state_class={state_class}
                                               german_state_name={german_state_name}
                                               duration={duration}/>}
                </Grid>
            </Paper>

        );

    }
}