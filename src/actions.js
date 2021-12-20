import { apiCall } from "./api/api";
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constants";

// action creator
export const setSearchField = (text) => ({
  type: CHANGE_SEARCHFIELD,
  payload: text,
});

// action creator which (once excecuted) creates a ..function, which will have access to `dispatch` method, and which contains statements for making asynchronous API call (because redux-thunk is used)

export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  return apiCall("https://jsonplaceholder.typicode.com/users/") // return the Promise for testing (see actions.test.js)
    .then((data) => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch((error) =>
      dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error })
    );
};

/**
 * Note that the asynchronous call in requestRobots is enabled by `redux-thunk`, which allows for dispatching of a function (which is `requestRobots`)
 *  - the dispatched function `requestRobots` will then have access to the method `dispatch` of redux store
 */
