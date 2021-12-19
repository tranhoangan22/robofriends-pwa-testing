import { shallow } from "enzyme";
import React from "react";

import MainPage from "./MainPage";

let wrapper;

beforeEach(() => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    robots: [],
    searchField: "",
    isPending: false,
  };
  wrapper = shallow(<MainPage {...mockProps} />);
}); // comes with jest, makes sure sth runs before each test

it("renders MainPage without crashing", () => {
  expect(wrapper).toMatchSnapshot();
});

// instance() gives us access to all the methods in MainPage (class) component
it("filters robots correctly", () => {
  const mockProps2 = {
    onRequestRobots: jest.fn(),
    robots: [
      {
        id: 3,
        name: "John",
        email: "john@gmail.com",
      },
    ],
    searchField: "john",
    isPending: false,
  };
  const wrapper2 = shallow(<MainPage {...mockProps2} />);

  expect(wrapper2.instance().filteredRobots()).toEqual([
    {
      id: 3,
      name: "John",
      email: "john@gmail.com",
    },
  ]);
});

it("filters robots correctly 2", () => {
  const mockProps3 = {
    onRequestRobots: jest.fn(),
    robots: [
      {
        id: 3,
        name: "John",
        email: "john@gmail.com",
      },
    ],
    searchField: "a",
    isPending: false,
  };
  const wrapper3 = shallow(<MainPage {...mockProps3} />);

  expect(wrapper3.instance().filteredRobots()).toEqual([]);
});
