import React, { Component } from 'react';
import Swal from 'sweetalert2';

class Logout extends Component {
  handleLogout = () => {
    const { setIsAuthenticated } = this.props;

    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', false);
            setIsAuthenticated(false);
          },
        });
      }
    });
  };

  render() {
    return (
      <button
        style={{ marginLeft: '12px' }}
        className="muted-button"
        onClick={this.handleLogout}
      >
        Logout
      </button>
    );
  }
}

export default Logout;
