import React from 'react';
import ReactDOM from 'react-dom';
import GenreSelection from '../GenreSelection';
import {configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreButton from '../StyleComponents/GenreButton'

configure({ adapter: new Adapter() });

describe('GenreSelection', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GenreSelection/>, div);
    });
});

describe("GenreSelection mounting", () => {
        const GenreScreen = mount(<GenreSelection />)
      it("Contains a GenreSelection button that directs you to a new page", () => {
          const divs = GenreScreen.find("a")
          expect(divs.length).toBe(1);
      });

      it("Genre buttons should not be on by default", () => {
        const divs = GenreScreen.find(GenreButton)
        expect(divs.length).toBe(0);
      });



      });
