// This is a container component that handle states by connecting to the Redux store

import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchField, requestRobots } from "../actions";

import MainPage from "../components/MainPage";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // normally `dispatch` accepts an action (here: `setSearchField(event.target.value)` ) which is a object with keys of `type` and `payload` => the action "is dispatched"
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    // `redux-thunk` allows for dispatching of a function (ie `requestRobots`) which will have access to the `dispatch` method and where asynchronous API calls are executed
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

class App extends Component {
  render() {
    return <MainPage {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
