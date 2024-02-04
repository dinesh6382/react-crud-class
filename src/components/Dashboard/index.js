import React, { Component } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../data';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: employeesData,
      selectedEmployee: null,
      isAdding: false,
      isEditing: false,
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('employees_data'));
    if (data !== null && Object.keys(data).length !== 0) {
      this.setState({ employees: data });
    }
  }

  handleEdit = (id) => {
    const { employees } = this.state;
    const [employee] = employees.filter((employee) => employee.id === id);

    this.setState({
      selectedEmployee: employee,
      isEditing: true,
    });
  };

  handleDelete = (id) => {
    const { employees } = this.state;

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        const [employee] = employees.filter((employee) => employee.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter((employee) => employee.id !== id);
        localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
        this.setState({ employees: employeesCopy });
      }
    });
  };

  render() {
    const { setIsAuthenticated } = this.props;
    const { employees, selectedEmployee, isAdding, isEditing } = this.state;

    return (
      <div className="container">
        {!isAdding && !isEditing && (
          <>
            <Header
              setIsAdding={() => this.setState({ isAdding: true })}
              setIsAuthenticated={setIsAuthenticated}
            />
            <Table
              employees={employees}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
            />
          </>
        )}
        {isAdding && (
          <Add
            employees={employees}
            setEmployees={(employees) => this.setState({ employees })}
            setIsAdding={() => this.setState({ isAdding: false })}
          />
        )}
        {isEditing && (
          <Edit
            employees={employees}
            selectedEmployee={selectedEmployee}
            setEmployees={(employees) => this.setState({ employees })}
            setIsEditing={() => this.setState({ isEditing: false })}
          />
        )}
      </div>
    );
  }
}

export default Dashboard;
