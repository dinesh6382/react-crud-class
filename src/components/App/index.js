import React, { Component } from 'react';
import Login from '../Login';
import Dashboard from '../Dashboard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: null,
    };
  }

  componentDidMount() {
    const isAuthenticated = JSON.parse(localStorage.getItem('is_authenticated'));
    this.setState({ isAuthenticated });
  }

  render() {
    return (
      <>
        {this.state.isAuthenticated ? (
          <Dashboard setIsAuthenticated={isAuthenticated => this.setState({ isAuthenticated })} />
        ) : (
          <Login setIsAuthenticated={isAuthenticated => this.setState({ isAuthenticated })} />
        )}
      </>
    );
  }
}

export default App;
