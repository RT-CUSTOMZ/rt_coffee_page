import React from 'react';
import '../css/coffee_font.css';
import '../css/CoffeeCup.css';

export default class CoffeeCup extends React.Component {
    render() {
        const {Icon} = this.props;

        return (
                <div className={Icon} >

                </div>
        );

    }
}