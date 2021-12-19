import { shallow, mount, render } from "enzyme";
import React from "react"; // to be able to read jsx <CounterButton />

import CounterButton from "./CounterButton";

it("expect to render Card component", () => {
  const mockColor = "red";
  expect(shallow(<CounterButton color={mockColor} />)).toMatchSnapshot();
});

it("correctly increments the counter", () => {
  const mockColor = "red";
  const wrapper = shallow(<CounterButton color={mockColor} />);

  // simulate one click on the counter button
  wrapper.find('[id="counter"]').simulate("click"); // wrap the button to simulate

  // simulate the 2nd click on the counter button
  wrapper.find('[id="counter"]').simulate("click");

  expect(wrapper.state()).toEqual({ count: 2 }); // with initial value of count being 0, 2 clicks result in count of 2

  expect(wrapper.props().color).toEqual("red");
});
