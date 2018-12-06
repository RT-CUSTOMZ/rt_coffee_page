import React from 'react';
import {Grid, Paper, Typography, TableBody, TableRow, TableCell, Table} from '@material-ui/core'
import Moment from "react-moment";

export default class StatusOfScale extends React.Component {
    render() {
        const {scaleIsLatest, currentCoffee} = this.props;

        return (
            <Paper className={'machines scale_paper' +((!scaleIsLatest)?' deactivated':'')  }>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom className={((!scaleIsLatest)?'deactivated':'')}>
                        Waage
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Letzter Füllstand Kaffeekanne
                                    </TableCell>
                                    <TableCell>
                                        <span >{currentCoffee.fill_level}%</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Zuletzt gewogen
                                    </TableCell>
                                    <TableCell>
                                        <Moment locale="de" tz="Europe/Paris" format="LTS">{currentCoffee.time_fill_level}</Moment>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Das war
                                    </TableCell>
                                    <TableCell>
                                        <Moment locale="de" tz="Europe/Paris" fromNow>{currentCoffee.time_fill_level}</Moment>
                                    </TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </Typography>
                </Grid>
            </Paper>
        );

    }
}