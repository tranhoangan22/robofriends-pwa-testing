// Note that `jest` comes pre-installed with "create-react-app" in "react-scripts"

import { shallow, mount, render } from "enzyme";
import React from "react"; // to be able to read jsx <Card />

import Card from "./Card";

/**
 * shallow rendering is useful to constrain yourself to testing a component as a unit,
 * and to ensure that your tests aren't indirectly asserting on behavior of child components (rather, only of that component -> hence shallow).
 *
 * mount: does the full render and mount the component on DOM
 *
 * render: render React component to a static HTML
 */

it("expect to render Card component", () => {
  //   expect(shallow(<Card />).length).toEqual(1);
  expect(shallow(<Card />)).toMatchSnapshot();
});

// Issue - Empty ShallowWrapper: https://backbencher.dev/articles/empty-shallowwrapper-snapshot-jest-enzyme
