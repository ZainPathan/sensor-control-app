import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    makeStyles, Typography
} from '@material-ui/core';
import React from 'react';

const useSensorCardStyle = makeStyles({
    button: {
        width: '100%'
    }
});

interface SensorCardProps {
    sensorData: any,
    handleSensorButtonClick: Function
}

const SensorCard: React.FC<SensorCardProps> = ({sensorData, handleSensorButtonClick}) => {
    const classes = useSensorCardStyle();

    return (
        <Grid item xs={12} sm={4} md={4} lg={4}>
            <Card variant="outlined">
                <CardContent>
                    <Typography
                        variant="h5"
                        component="h2"
                    >
                        {sensorData.name}
                    </Typography>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        ID: {sensorData.id}
                    </Typography>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Connection Status: {sensorData.connected === true ? 'Connected' : 'Disconnected'}
                    </Typography>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Value(in unit): {sensorData.value ? `${sensorData.value} ${sensorData.unit}` : '-'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color={sensorData.connected === true ? 'secondary' : 'primary'}
                        className={classes.button}
                        onClick={() => {
                            handleSensorButtonClick(sensorData);
                        }}
                        size="large"
                    >
                        {sensorData.connected === true ? 'Disconnect' : 'Connect'}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default SensorCard;