import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core'
import CoffeeCup from "./CoffeeCup";

export default class LastEventIcon extends React.Component {
    render() {
        const {current, last_status, warning} = this.props;

        return (
            <Paper className={'machines'}>
                <Grid item xl={6}>
                    <CoffeeCup current={current}/>
                </Grid>
                <Grid item xl={6}>
                    Der letzte Status kam von der <Typography variant="body2" gutterBottom><b>{last_status}</b>.</Typography> <br/>
                    <Typography variant="caption" gutterBottom><span className={'warning'}>{warning}</span></Typography>
                </Grid>
            </Paper>
        );

    }
}