import React from 'react';
import ReactDOM from 'react-dom';
import CustomNavbar from '../CustomNavbar';

jest.mock("../StyleComponents/navbar.css", () => jest.fn());

describe('NavBar', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CustomNavbar/>, div);
    });
});