import React, { Component } from 'react';
import Logout from '../Logout';

class Header extends Component {
  render() {
    const { setIsAdding, setIsAuthenticated } = this.props;

    return (
      <header>
        <h1>Employee Management Software</h1>
        <div style={{ marginTop: '30px', marginBottom: '18px' }}>
          <button onClick={() => setIsAdding(true)}>Add Employee</button>
          <Logout setIsAuthenticated={setIsAuthenticated} />
        </div>
      </header>
    );
  }
}

export default Header;
