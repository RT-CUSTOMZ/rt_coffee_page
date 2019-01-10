import React from 'react';
import {Grid, Typography, CircularProgress} from '@material-ui/core'
import CoffeeCup from "./CoffeeCup";

export default class LastEventIcon extends React.Component {
    render() {
        const {last_status, warning, Icon, last_event} = this.props;
        return (
                <Grid container justify={'center'} alignItems={'center'}>
                    <Grid item md={4} xs={6}>
                        <CoffeeCup Icon={Icon}/>
                    </Grid>
                    <Grid item md={1} xs={6}>
                        <span className={'warning'}>{last_event}</span>
                        {last_event==="coffee_brewing"?<CircularProgress />:""}
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            <span className={'warning'}>{warning}</span><br/>
                            Der letzte Status kam von der <b>{last_status}</b>.
                        </Typography>
                    </Grid>
                </Grid>

        );

    }
}