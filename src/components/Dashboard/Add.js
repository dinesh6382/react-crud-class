import React, { Component } from 'react';
import Swal from 'sweetalert2';

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      salary: '',
      date: '',
    };
  }

  handleAdd = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, salary, date } = this.state;
    const { employees, setEmployees, setIsAdding } = this.props;

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
    };

    employees.push(newEmployee);
    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  render() {
    const { firstName, lastName, email, salary, date } = this.state;
    const { setIsAdding } = this.props;

    return (
      <div className="small-container">
        <form onSubmit={this.handleAdd}>
          <h1>Add Employee</h1>
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
            <input type="submit" value="Add" />
            <input
              style={{ marginLeft: '12px' }}
              className="muted-button"
              type="button"
              value="Cancel"
              onClick={() => setIsAdding(false)}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Add;
