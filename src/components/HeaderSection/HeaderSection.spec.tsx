import React from 'react';
import renderer from 'react-test-renderer';
import HeaderSection from './HeaderSection';
import {fireEvent, render} from "@testing-library/react";

describe('HeaderSection tests', () => {
    const mockSensorToggleFn = jest.fn();

    it('snapshot test', () => {
        const tree = renderer
            .create(
                <HeaderSection
                    handleSensorToggle={mockSensorToggleFn}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with App title', () => {
        const appTitleText = 'Sensor Management';
        const { getByText } = render(
            <HeaderSection
                handleSensorToggle={mockSensorToggleFn}
            />
        );
        expect(getByText(appTitleText)).toBeTruthy();
    });

    it('toggle handler function is called', () => {
        const { getByRole } = render(
            <HeaderSection
                handleSensorToggle={mockSensorToggleFn}
            />
        );
        fireEvent.click(getByRole('checkbox'));
        expect(mockSensorToggleFn).toHaveBeenCalled();
    });
})