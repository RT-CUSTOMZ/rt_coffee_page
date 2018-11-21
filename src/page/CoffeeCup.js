import React from 'react';
import '../css/coffee_font.css';
import './CoffeeCup.css';
import {Paper} from '@material-ui/core'

export default class CoffeeCup extends React.Component {
    render() {
        const {current} = this.props;
        let currentCoffee = Object.keys(current).reduce(function (total, currentValue) {
            let entry = {
                state : current[currentValue].state,
                fill_level : current[currentValue].fill_level,
            }

            return entry;
        },0);
        let Icon = "no_status"
        if (currentCoffee.state === "fill_level") {
            if(currentCoffee.fill_level >= 90){
                Icon = "icon-coffee_cup_100";
            } else if(currentCoffee.fill_level >= 55){
                Icon = "icon-coffee_cup_66";
            } else if(currentCoffee.fill_level >= 20){
                Icon = "icon-coffee_cup_33";
            } else if(currentCoffee.fill_level < 20){
                Icon = "icon-coffee_cup_0";
            }
        }
        if (currentCoffee.state === "coffee_brewing") {
            Icon = "icon-coffee_machine_0";
        }
        if (currentCoffee.state === "coffee_ready") {
            Icon = "icon-coffee_machine_100";
        }
        return (
            <div className={Icon}>

            </div>
        );

    }
}