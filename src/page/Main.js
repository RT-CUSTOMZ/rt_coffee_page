import React from 'react';
import {Grid} from '@material-ui/core'
import LastEventIcon from "./LastEventIcon";
import StatusOfCoffeeMachine from "./StatusOfCoffeeMachine";
import StatusOfScale from "./StatusOfScale";
import "./Main.css";

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
            if (scaleIsLatest) {
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
        }

        return (
            <React.Fragment>
                 <Grid container >
                     <Grid item xs={3}>
                     </Grid>
                     <Grid item  xs={6} >
                         <Grid container>
                            <LastEventIcon
                                current={current}
                                last_status={last_status}
                                warning={warning}/>
                         </Grid>
                     </Grid>
                     <Grid item xs={3}>
                     </Grid>
                    <Grid item xs={12}>
                        <Grid container justify={'space-around'} alignItems={'stretch'} item>
                            <StatusOfCoffeeMachine
                                coffeeMachineIsLatest={coffeeMachineIsLatest}
                                currentCoffee={currentCoffee}
                                state_class={state_class}
                                german_state_name={german_state_name}
                                duration={duration}/>
                            <StatusOfScale
                                scaleIsLatest={scaleIsLatest}
                                fill_level_class={fill_level_class}
                                currentCoffee={currentCoffee}/>
                        </Grid>
                    </Grid>
                 </Grid>
            </React.Fragment>
        );

    }
}