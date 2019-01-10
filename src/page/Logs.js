import React from 'react';
import {Table, TableRow, TableBody, TableCell, TableHead, Grid} from '@material-ui/core'
export default class Logs extends React.Component {


    render() {

        const {logs} = this.props;

        let i = 0;
        return(
            <Grid container item lg={12}>
                <h1>Log File</h1>

                <Table>
                    <TableHead key={'1'}>
                        <TableRow>
                            <TableCell>state</TableCell>
                            <TableCell>timestamp</TableCell>
                            <TableCell>fill_level</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody key={'2'}>
                        {
                            Object.keys(logs).map(currentMachine => {
                                let eachMachine = logs[currentMachine];

                                return(
                                    Object.keys(eachMachine).map(day =>{
                                        let eachDay = eachMachine[day];

                                        return(
                                            Object.keys(eachDay).map(time =>{
                                                let eachTime = eachDay[time];
                                                    i=i+1;
                                                    return(
                                                        <TableRow key={'r'+i}>
                                                            <TableCell key={'r'+i+'-1-'+eachTime.state}>{eachTime.state}</TableCell>
                                                            <TableCell key={eachTime.timestamp}>{eachTime.timestamp}</TableCell>
                                                            <TableCell key={'r'+i+'-3-'+eachTime.fill_level}>{eachTime.fill_level}</TableCell>
                                                        </TableRow>
                                                    );

                                            }, this)
                                        )
                                    }, this)
                                )
                            }, this)
                        }
                    </TableBody>
                </Table>

            </Grid>
        )
    }
}