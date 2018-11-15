import React from 'react';

export default class Main extends React.Component {
    render() {
        const {current} = this.props;

        let moment = require('moment');
        moment.locale('de');
        let currentCoffeeState = Object.keys(current).reduce(function (total, currentValue) {
            let entry = {
                state : current[currentValue].state,
                weight : current[currentValue].weight,
                timeoriginal : current[currentValue].time,
                date : moment(current[currentValue].time).format('LL'),
                time : moment(current[currentValue].time).fromNow(),
            }

            return entry;
        },0);
        return (
            <div>
                {currentCoffeeState.weight} <br/>
                {currentCoffeeState.time} <br/>
                {currentCoffeeState.state} <br/>
                {moment(currentCoffeeState.timeoriginal).calendar()} <br/>
            </div>
        );

    }
}