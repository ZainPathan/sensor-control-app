import React, { useEffect, useState } from 'react';
import './App.style';
import { Grid } from '@material-ui/core';
import useAppStyles from './App.style';
import SensorCard from './components/SensorCard';
import HeaderSection from './components/HeaderSection';

const client = new WebSocket('ws://localhost:5000');

function App() {
    const classes = useAppStyles();
    const [isShowAllSensors, setShowAllSensors] = useState(true);

    const [temperatureSensor, setTemperatureSensor] = useState<any>({});
    const [pressureSensor, setPressureSensor] = useState<any>({});
    const [humiditySensor, setHumiditySensor] = useState<any>({});
    const [pm25Sensor, setPM25Sensor] = useState<any>({});
    const [pm10Sensor, setPM10Sensor] = useState<any>({});
    const [windSensor, setWindSensor] = useState<any>({});

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            localStorage.removeItem('sensorData');
        };
        client.onmessage = (message) => {
            const currentSensorData: any = JSON.parse(message.data);

            switch(currentSensorData.name) {
                case 'Temperature':
                    setTemperatureSensor(currentSensorData);
                    break;
                case 'Pressure':
                    setPressureSensor(currentSensorData);
                    break;
                case 'Humidity':
                    setHumiditySensor(currentSensorData);
                    break;
                case 'PM2.5':
                    setPM25Sensor(currentSensorData);
                    break;
                case 'PM10':
                    setPM10Sensor(currentSensorData);
                    break;
                case 'Wind':
                    setWindSensor(currentSensorData);
                    break;
                default:
                    console.log('Ignored message: ', currentSensorData);
            }
        };
        return () => client.close();
    }, [])

    const handleSensorButtonClick = (currentSensorData: any) => {
        let cmdObj = {};
        if(currentSensorData.connected) {
            cmdObj = {
                "command": "disconnect",
                "id": currentSensorData.id
            };
        } else {
            cmdObj = {
                "command": "connect",
                "id": currentSensorData.id
            };
        }
        client.send(JSON.stringify(cmdObj));
    }

    return (
        <div className="App">
          <Grid container
                spacing={3}
          >
            <Grid item
                  xs={12}
            >
                <HeaderSection
                    handleSensorToggle={(isFlagSet: boolean) => {
                        setShowAllSensors(isFlagSet);
                    }}
                />
            </Grid>
            <Grid container
                  spacing={3}
                  className={classes.sensorCardsSection}
            >
                {/*Load Sensor cards here*/}
                {temperatureSensor && (!isShowAllSensors ? temperatureSensor.connected : true) && (<SensorCard
                    key={temperatureSensor.id}
                    sensorData={temperatureSensor}
                    handleSensorButtonClick={handleSensorButtonClick}
                />)}
                {pressureSensor && (!isShowAllSensors ? pressureSensor.connected : true) && (<SensorCard
                    key={pressureSensor.id}
                    sensorData={pressureSensor}
                    handleSensorButtonClick={handleSensorButtonClick}
                />)}
                {humiditySensor && (!isShowAllSensors ? humiditySensor.connected : true) && (<SensorCard
                    key={humiditySensor.id}
                    sensorData={humiditySensor}
                    handleSensorButtonClick={handleSensorButtonClick}
                />)}
                {pm25Sensor && (!isShowAllSensors ? pm25Sensor.connected : true) && (<SensorCard
                    key={pm25Sensor.id}
                    sensorData={pm25Sensor}
                    handleSensorButtonClick={handleSensorButtonClick}
                />)}
                {pm10Sensor && (!isShowAllSensors ? pm10Sensor.connected : true) && (<SensorCard
                    key={pm10Sensor.id}
                    sensorData={pm10Sensor}
                    handleSensorButtonClick={handleSensorButtonClick}
                />)}
                {windSensor && (!isShowAllSensors ? windSensor.connected : true) && (<SensorCard
                    key={windSensor.id}
                    sensorData={windSensor}
                    handleSensorButtonClick={handleSensorButtonClick}
                />)}
            </Grid>
          </Grid>
        </div>
    );
}

export default App;
