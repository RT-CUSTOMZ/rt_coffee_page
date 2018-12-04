import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core'
import CoffeeCup from "./CoffeeCup";

export default class LastEventIcon extends React.Component {
    render() {
        const {current, last_status, warning} = this.props;

        return (
            <Paper className={'machines'}>
                <Grid container justify={'center'} alignItems={'stretch'} item>
                    <Grid item xs={4}>
                        <CoffeeCup current={current}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle1" gutterBottom>
                            Der letzte Status kam von der <b>{last_status}</b>.<br/><br/>
                            <span className={'warning'}>{warning}</span>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );

    }
}