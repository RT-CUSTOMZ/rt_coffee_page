import React from 'react';
import {Grid, Paper, Typography, CircularProgress} from '@material-ui/core'
import CoffeeCup from "./CoffeeCup";

export default class LastEventIcon extends React.Component {
    render() {
        const {last_status, warning, Icon, CoffeeColor, last_event} = this.props;
        return (
            <Paper className={'machines '+ CoffeeColor}>
                <Grid container justify={'center'} alignItems={'center'}>
                    <Grid item xs={4}>
                        <CoffeeCup Icon={Icon}/>
                    </Grid>
                    <Grid item xs={1}>
                        <span className={'warning'}>{last_event}</span>
                        {last_event==="coffee_brewing"?<CircularProgress />:""}
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="subtitle1" gutterBottom>
                            <span className={'warning'}>{warning}</span><br/>
                            Der letzte Status kam von der <b>{last_status}</b>.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );

    }
}