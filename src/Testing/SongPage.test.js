import React from 'react';
import ReactDOM from 'react-dom';
import SongPage from '../SongPage';
import {configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SongPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SongPage/>, div);
    });
    const pagerender = shallow(<SongPage/>)
    it("Iframe attribute rended without error", () => {
        const divs = pagerender.find('iframe')
        expect(divs.length).toBe(1);
    });
});
