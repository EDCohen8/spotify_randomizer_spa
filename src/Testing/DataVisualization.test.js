import React from 'react';
import ReactDOM from 'react-dom';
import DataVisualization from '../DataVisualization';
import Chart from './GraphComponent/Chart';

describe('DataVisualization', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DataVisualization/>, div);
    });
});