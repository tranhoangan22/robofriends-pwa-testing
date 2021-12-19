// "homepage" of our app, a presentational component, for testing..

import React, { Component } from "react";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import Header from "../components/Header";

import "./MainPage.css";

class MainPage extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  // moved `filterRobots` method out of render() -> it's easier to test
  filteredRobots = () =>
    this.props.robots.filter((robot) =>
      robot.name.toLowerCase().includes(this.props.searchField.toLowerCase())
    );

  render() {
    const { robots, onSearchChange, isPending } = this.props;
    return (
      <div className="tc">
        <Header />
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          {isPending ? (
            <h1>Loading</h1>
          ) : (
            <ErrorBoundry>
              <CardList robots={this.filteredRobots()} />
            </ErrorBoundry>
          )}
        </Scroll>
      </div>
    );
  }
}

export default MainPage;
