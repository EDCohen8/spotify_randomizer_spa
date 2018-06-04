import React from 'react';
import ReactDOM from 'react-dom';
import DataVisualization from '../DataVisualization';


describe('DataVisualization', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DataVisualization/>, div);
    });
});