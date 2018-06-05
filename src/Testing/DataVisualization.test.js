import React from 'react';
import ReactDOM from 'react-dom';
import DataVisualization from '../DataVisualization';
import Chart from '../GraphComponent/Chart';
import {configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("DataVisualization mounting", () => {
    const DataScreen = mount(<DataVisualization />)
  it("Page created 5 seperate links", () => {
      const divs = DataScreen.find("a")
      expect(divs.length).toBe(5);
  });


  });