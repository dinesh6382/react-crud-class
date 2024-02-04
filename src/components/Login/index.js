import React, { Component } from 'react';
import Swal from 'sweetalert2';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminEmail: 'admin@dinesh.com',
      adminPassword: '1234',
      email: 'admin@dinesh.com',
      password: '1234',
    };
  }

  handleLogin = (e) => {
    e.preventDefault();

    const { adminEmail, adminPassword, email, password } = this.state;
    const { setIsAuthenticated } = this.props;

    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="small-container">
        <form onSubmit={this.handleLogin}>
          <h1>Admin Login</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <input style={{ marginTop: '12px' }} type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
