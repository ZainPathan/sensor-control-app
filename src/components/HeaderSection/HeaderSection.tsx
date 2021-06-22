import React, { useState } from 'react';
import {
    AppBar,
    Grid,
    Switch,
    Typography
} from '@material-ui/core';
import useHeaderSectionStyles from './HeaderSection.style';

interface HeaderSectionProps {
    handleSensorToggle: Function
}

const HeaderSection: React.FC<HeaderSectionProps> = ({handleSensorToggle}) => {
    const classes = useHeaderSectionStyles();
    const [isShowAllSensors, setShowAllSensorsFlag] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowAllSensorsFlag(event.target.checked);
        handleSensorToggle(event.target.checked);
    }

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                className={classes.appBar}
            >
                <Grid container
                      alignItems="center"
                      justify="space-between"
                      spacing={2}>
                    <Grid item>
                        <Typography variant="h6" color="inherit">
                            Sensor Management
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid component="label"
                              container
                              alignItems="center"
                              spacing={1}
                        >
                            <Grid item>Show Connected</Grid>
                            <Grid item>
                                <Switch
                                    checked={isShowAllSensors}
                                    onChange={handleChange}
                                    value="checked"
                                />
                            </Grid>
                            <Grid item>Show All</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}

export default HeaderSection;