import * as actions from "./actions";
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constants";

import configureMockStore from "redux-mock-store";
import ThunkMiddleware from "redux-thunk";

import nock from "nock";

// Since we are testing a thunk action creator our mock store needs to be configured with the redux-thunk middleware in our test
const middlewares = [ThunkMiddleware];
const mockStore = configureMockStore(middlewares);

/**
 * Test that the action creator `setSearchField` does indeed returns the correct action
 **/
it("should create an action to search Robot", () => {
  const text = "wooo";
  const expectedAction = {
    type: CHANGE_SEARCHFIELD,
    payload: text,
  };
  expect(actions.setSearchField(text)).toEqual(expectedAction);
});

/**
 * Test that the action (which is function due to us using thunk) creator `requestRobots`, which creates a function having access to `dispatch`,
 * after being dispatched (from a fake redux store) will lead to a series of actions being dispatched.
 **/
it("should dispatch all the actions correctly", () => {
  const store = mockStore(); // create a fake store that has the thunk middleware

  const expectedAction1 = {
    type: REQUEST_ROBOTS_PENDING,
  };

  const expectedAction2 = {
    type: REQUEST_ROBOTS_SUCCESS,
    payload: [
      {
        id: "123",
        name: "Robot AnTr",
        email: "an-tr@gmail.com",
      },
    ],
  };

  const expectedAction3 = {
    type: REQUEST_ROBOTS_FAILED,
  };

  // Intercept the network request to `https://jsonplaceholder.typicode.com/users`, which is expected when `actions.requestRobots()` is dispatched, because it is part of the series of asynchronous events.. 
  nock("https://jsonplaceholder.typicode.com/users")
    .get("/")
    .reply(
      200,
      [
        {
          id: "123",
          name: "Robot AnTr",
          email: "an-tr@gmail.com",
        },
      ],
      { "Access-Control-Allow-Origin": "*" }
    );

  /**
   * a sequence of actions can be dispatched ASYCHRONOUSLY (asynchronous API requests) 
   * `return` used to wait for all the test events to finish
   * */
  return store.dispatch(actions.requestRobots()).then(() => {
    console.log(store.getActions());

    // the expected sequence of actions being dispatched
    expect(store.getActions()[0]).toEqual(expectedAction1); // First, REQUEST_ROBOTS_PENDING is dispatched
    expect(store.getActions()[1]).toEqual(expectedAction2); // Second, REQUEST_ROBOTS_SUCCESS is dispatched if `apiCall("https://jsonplaceholder.typicode.com/users/")` is successfull
  });
});

/**
 * Out mock store has a store.getActions method which when called gives us an array of all previously dispatched actions
 */
//   const dispatchedActions = store.getActions();

//   expect(dispatchedActions[0]).toEqual(expectedAction);

/**
 * Use an HTTP mocking library like Nock which will let the Axios library make a request.
 * However this HTTP request will be intercepted and handled by Nock instead of a real server.
 * By using Nock we can specify the response for a given request within our tests.
 *
 *
 * nock issue fixes:
 * 	- debugging nock: `export DEBUG=nock.* && npm test ./src/actions.test.j`
 * 	- https://github.com/axios/axios/issues/2654
 */
