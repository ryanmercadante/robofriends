import React, { Component } from 'react';
import CardList from './CardList';
import { robots } from './robots'
import SearchBox from './SearchBox';

class App extends Component {
  
  constructor() {
    // Because App owns state, including robots, its allowed to change it.
    super();
    this.state = {
      robots: robots,
      searchField: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
    });
    return (
      <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox searchChange={ this.onSearchChange }/>
        <CardList robots={ filteredRobots } /> {/*  CardList accepts robots as props even though its state in App.js */}
      </div>
    );
  }
}

export default App;