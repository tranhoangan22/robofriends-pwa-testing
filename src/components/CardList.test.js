import { shallow } from "enzyme";
import React from "react"; // to be able to read jsx <CardList />

import CardList from "./CardList";

it("expect to render CardList component", () => {
  const mockRobots = [
    {
      id: 1,
      name: "John Snow",
      username: "JohnJohn",
      email: "john@gmail.com",
    },
  ];
  expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot();
});
