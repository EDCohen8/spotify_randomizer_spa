import React from 'react';
import ReactDOM from 'react-dom';
import GenreSelection from '../GenreSelection';


describe('Genre', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GenreSelection/>, div);
    });
});