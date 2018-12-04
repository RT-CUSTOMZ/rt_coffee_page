import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core'
import Moment from "react-moment";

export default class StatusOfScale extends React.Component {
    render() {
        const {scaleIsLatest, fill_level_class, currentCoffee} = this.props;

        return (
            <Paper className={'machines scale_paper' +((!scaleIsLatest)?' deactivated':'')  }>
                <Grid item xl={6}>
                    <Typography variant="h3" gutterBottom className={((!scaleIsLatest)?'deactivated':'')}>
                        Waage
                    </Typography>
                    Füllstand Kaffeekanne:<span className={fill_level_class}>{currentCoffee.fill_level}%</span> <br/>
                    Zuletzt gewogen um: <Moment locale="de" tz="Europe/Paris" format="LTS">{currentCoffee.time_fill_level}</Moment> <br/>
                    Das war: <Moment locale="de" tz="Europe/Paris" fromNow>{currentCoffee.time_fill_level}</Moment> <br/>
                </Grid>
            </Paper>
        );

    }
}