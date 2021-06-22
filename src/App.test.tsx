import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('App component tests', () => {
    it('snapshot test', () => {
        const tree = renderer
            .create(
                <App />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});