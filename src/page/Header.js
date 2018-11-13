import React from 'react';

export default class Header extends React.Component {
    render() {
       const {current} = this.props;
       var ok = Object.keys(current).reduce(function (total, currentValue) {
                const currentCoffeeState = current[currentValue].status;
                console.log(currentCoffeeState);
                return currentCoffeeState;
            }
            ,0);

        return (
            <div>
                test <br/>
                {ok}
            </div>
        );
    }
}