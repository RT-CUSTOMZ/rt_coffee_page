import React from 'react';

export default class Messaging extends React.Component {


    render() {
        const { token, message } = this.props;
        let tokenElement = "No token!";
        let messageElement = "no message";

        if (null !== token) {
            tokenElement = token;
        }
        if (null !== message) {
            messageElement = message.type;
        }

        return (
            <div>
                <h3>Firebase Cloud Messaging</h3>
                <div>{tokenElement}</div>

                <div>{messageElement}</div>
            </div>

        )
    }
}