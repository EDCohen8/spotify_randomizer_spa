import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';
import {configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Login', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login/>, div);
    });
    const loginscreen = shallow(<Login />)
      it("Contains a login button that directs you to a new page", () => {
          const divs = loginscreen.find('a')
          expect(divs.length).toBe(1);
      });


});
