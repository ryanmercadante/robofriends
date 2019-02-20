import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

import { setSearchField } from "../actions";

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  };
};

// dispatch is what triggers the action
const mapDispatchToProps = dispatch => {
  return {
    // onSearchChange prop receives an event, and this event is going to dispatch the action setSearchField which receives input text, hence event.target.value
    onSearchChange: event => dispatch(setSearchField(event.target.value))
  };
};

class App extends Component {
  constructor() {
    // Because App owns state, including robots, its allowed to change it.
    super();
    this.state = {
      robots: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users => this.setState({ robots: users }));
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (robots.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />{" "}
              {/*  CardList accepts robots as props even though its state in App.js */}
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

// connect is a higher order function - a function that returns another function
// connect is going to run and whatever connect does inside the function is going to return another function which runs App
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
