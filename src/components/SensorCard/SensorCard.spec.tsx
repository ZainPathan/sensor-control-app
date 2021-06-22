import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import SensorCard from './SensorCard';

describe('SensorCard tests', () => {

    const mockSensorData = {
        "id": "0",
        "name": "Temperature",
        "connected": true,
        "unit": "°C",
        "value": "15.624"
    };
    const mockButtonClick = jest.fn();

    it('snapshot test', () => {
        const tree = renderer
            .create(
                <SensorCard
                    sensorData={mockSensorData}
                    handleSensorButtonClick={mockButtonClick}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('loads with proper Sensor data', () => {
        const mockSensorTitle = 'Temperature';
        const { getByText } = render(
            <SensorCard
                sensorData={mockSensorData}
                handleSensorButtonClick={mockButtonClick}
            />
        );
        expect(getByText(mockSensorTitle)).toBeTruthy();
    });

    it('handler function is called on button click', () => {
        const { getByRole } = render(
            <SensorCard
                sensorData={mockSensorData}
                handleSensorButtonClick={mockButtonClick}
            />
        );
        fireEvent.click(getByRole('button'));
        expect(mockButtonClick).toHaveBeenCalled();
    });
})