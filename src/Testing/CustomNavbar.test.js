import React from 'react';
import ReactDOM from 'react-dom';
import {NavItem, Navbar} from 'react-bootstrap';
import CustomNavbar from '../CustomNavbar';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
jest.mock("../StyleComponents/navbar.css", () => jest.fn());

describe('NavBar', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CustomNavbar/>, div);
    });
    const navscreen = shallow(<CustomNavbar/>)

      it("4 seperated navigation created", () => {
          const divs = navscreen.find(NavItem)
          expect(divs.length).toBe(4);
      });

      it("Navbar renders correctly", () => {
        const divs = navscreen.find(Navbar)
        expect(divs.length).toBe(1);
    });
});
