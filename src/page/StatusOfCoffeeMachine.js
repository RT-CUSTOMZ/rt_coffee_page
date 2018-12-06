import React from 'react';
import {Grid, TableBody, TableCell, TableRow, Typography, Table} from '@material-ui/core'
import Moment from "react-moment";

export default class StatusOfCoffeeMachine extends React.Component {
    render() {
        const {currentCoffee, coffeeMachineIsLatest, state_class, german_state_name, duration} = this.props;

        return (

                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom className={((!coffeeMachineIsLatest)?'deactivated':'')}>
                        Kaffeemaschine
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Letzter Status
                                    </TableCell>
                                    <TableCell>
                                        <span className={state_class}>{german_state_name}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Zuletzt gekocht
                                    </TableCell>
                                    <TableCell>
                                        <Moment locale="de" tz="Europe/Paris" format="LTS">{currentCoffee.time_coffee_machine}</Moment>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Das war
                                    </TableCell>
                                    <TableCell>
                                        <Moment locale="de" tz="Europe/Paris" fromNow>{currentCoffee.time_coffee_machine}</Moment> ({duration.toFixed(2)})
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Typography>
                </Grid>

        );

    }
}