import React from 'react';
import {CircularProgress, Grid, Table, TableBody, TableCell, TableRow, Typography, Paper} from '@material-ui/core';

import "../../css/Main.css";

import 'moment-timezone';
import 'moment/locale/de';
import CoffeeCup from "../CoffeeCup";
import Moment from "react-moment";

export default class RaspberryPiLayout extends React.Component {
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
        let time_since_brewing = moment.duration(moment().diff(currentCoffee.time_coffee_machine)).asHours();
        if (scaleIsLatest||time_since_brewing>4) {

        } else {
            if(currentCoffee.state === "coffee_ready") {
                state_class = 'font_coffeeReady';
            } else {
                state_class = 'font_coffeeBrewing'
            }

        }
        let time_since_weighing = moment.duration(moment().diff(currentCoffee.time_fill_level)).asHours();
        if(scaleIsLatest){

            last_status = "Waage";
            if(currentCoffee.fill_level <= 20){
                warning = "Der Kaffee ist fast leer! Bitte neuen kochen.";
            } else {
                warning = "";
            }
            if(time_since_brewing>4){
                warning = "Der Kaffee ist alt! Bitte neuen kochen.";
            }
        } else {
            last_status = "Kaffeemaschine";
            warning = "Bitte die Kaffeekanne auf die Waage stellen.";
            if(time_since_brewing>4){
                warning = "Der Kaffee ist alt! Bitte neuen kochen.";
            }
        }

        let Icon = "";
        let CoffeeColor = "";

        if (timestamp_coffeemachine < timestamp_fillevel) {
            if(currentCoffee.fill_level >= 90){
                Icon = "icon-coffee_cup_100";
                CoffeeColor = "coffee_FillLevel_100";
            } else if(currentCoffee.fill_level >= 55){
                Icon = "icon-coffee_cup_66";
                CoffeeColor = "coffee_FillLevel_66";
            } else if(currentCoffee.fill_level >= 20){
                Icon = "icon-coffee_cup_33";
                CoffeeColor = "coffee_FillLevel_33";
            } else if(currentCoffee.fill_level < 20){
                Icon = "icon-coffee_cup_0";
                CoffeeColor = "coffee_FillLevel_0";
            }
        }
        else
        {
            if (currentCoffee.state === "coffee_brewing") {
                Icon = "icon-coffee_machine_0";
                CoffeeColor = "coffee_coffeeBrewing"
            }
            if (currentCoffee.state === "coffee_ready") {
                Icon = "icon-coffee_machine_100";
                CoffeeColor = "coffee_coffeeReady"
            }
        }

        return (
            <Grid container justify={"center"} alignItems={"center"}>
                <Grid item>
                    <Grid container justify={'center'} alignItems={'center'} className={CoffeeColor}>
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
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid  item xs={12}>
                            <Paper className={"heading"}>
                                <Typography variant="h5" gutterBottom className={((!coffeeMachineIsLatest)?'deactivated':'')}>
                                    Kaffeemaschine
                                </Typography>
                            </Paper>
                            <Typography variant="subtitle1" gutterBottom>
                                <Grid container justify={"center"} alignItems={"center"}>
                                    <Grid item>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        Letzter Status
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className={state_class}>{german_state_name}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                    </TableCell>
                                                    <TableCell>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Zuletzt gekocht
                                                    </TableCell>
                                                    <TableCell>
                                                        <Moment locale="de" tz="Europe/Paris" format="LTS">{currentCoffee.time_coffee_machine}</Moment> <br/>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Moment locale="de" tz="Europe/Paris" fromNow>{currentCoffee.time_coffee_machine}</Moment> <br/>
                                                    </TableCell>
                                                    <TableCell>
                                                        vor genau {time_since_brewing.toFixed(2)} Stunden
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Aktueller Füllstand
                                                    </TableCell>
                                                    <TableCell>
                                                        {currentCoffee.fill_level}%
                                                    </TableCell>
                                                    <TableCell>
                                                    </TableCell>
                                                    <TableCell>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        Zuletzt gewogen
                                                    </TableCell>
                                                    <TableCell>
                                                        <Moment locale="de" tz="Europe/Paris" format="LTS">{currentCoffee.time_fill_level}</Moment> <br/>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Moment locale="de" tz="Europe/Paris" fromNow>{currentCoffee.time_fill_level}</Moment> <br/>
                                                    </TableCell>
                                                    <TableCell>
                                                        vor genau {time_since_weighing.toFixed(2)} Stunden
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );

    }
}