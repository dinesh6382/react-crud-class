import React, { Component } from 'react';
import Swal from 'sweetalert2';

class Edit extends Component {
  constructor(props) {
    super(props);

    const { selectedEmployee } = this.props;

    this.state = {
      id: selectedEmployee.id,
      firstName: selectedEmployee.firstName,
      lastName: selectedEmployee.lastName,
      email: selectedEmployee.email,
      salary: selectedEmployee.salary,
      date: selectedEmployee.date,
    };
  }

  handleUpdate = (e) => {
    e.preventDefault();

    const { id, firstName, lastName, email, salary, date } = this.state;
    const { employees, setEmployees, setIsEditing } = this.props;

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  render() {
    const { firstName, lastName, email, salary, date } = this.state;
    const { setIsEditing } = this.props;

    return (
      <div className="small-container">
        <form onSubmit={this.handleUpdate}>
          <h1>Edit Employee</h1>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <label htmlFor="salary">Salary (₹)</label>
          <input
            id="salary"
            type="number"
            name="salary"
            value={salary}
            onChange={(e) => this.setState({ salary: e.target.value })}
          />
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => this.setState({ date: e.target.value })}
          />
          <div style={{ marginTop: '30px' }}>
            <input type="submit" value="Update" />
            <input
              style={{ marginLeft: '12px' }}
              className="muted-button"
              type="button"
              value="Cancel"
              onClick={() => setIsEditing(false)}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Edit;
