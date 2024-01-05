import React from "react";

import EmployeeAdd from "./EmployeeAdd.jsx";
import EmployeeFilter from "./EmployeeFilter.jsx";

function EmployeeTable({ employees, deleteEmployee }) {
  // return a list of EmployeeRow components
  // now we receive the employees as a prop
  const employeeRows = employees.map((employee) => {
    return (
      <EmployeeRow
        key={employee._id}
        employee={employee}
        deleteEmployee={deleteEmployee}
      />
    );
  });
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Extension</th>
          <th>Email</th>
          <th>Title</th>
          <th>Date Hired</th>
          <th>Currently Employed?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{employeeRows}</tbody>
    </table>
  );
}

function EmployeeRow({ employee, deleteEmployee }) {
  function onDeleteClick() {
    deleteEmployee(employee._id);
  }
  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.extension}</td>
      <td>{employee.email}</td>
      <td>{employee.title}</td>
      <td>{employee.dateHired.toDateString()}</td>
      <td>{employee.currentlyEmployed ? "Yes" : "No"}</td>
      <td>
        <button onClick={onDeleteClick}>DELETE</button>
      </td>
    </tr>
  );
}

export default class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
    };
    // bind the createEmployee method to the component so it can be passed as a prop and still have access to the component's state
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  // this function is called when the component is mounted
  componentDidMount() {
    this.loadData();
  }

  // this is like the callback function in useEffect
  loadData() {
    fetch("/api/employees")
      .then((response) => response.json())
      .then((data) => {
        console.log("Total count of employees: ", data.count);
        data.employees.forEach((employee) => {
          employee.dateHired = new Date(employee.dateHired);
        });
        this.setState({ employees: data.employees });
      });
  }

  createEmployee(employee) {
    fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((newEmployee) => {
        console.log("New employee added: ", newEmployee);
        newEmployee.employee.dateHired = new Date(
          newEmployee.employee.dateHired
        );
        const newEmployees = this.state.employees.slice();
        newEmployees.push(newEmployee.employee);
        this.setState({ employees: newEmployees });
        console.log("Total count of employees: ", newEmployees.length);
      })
      .catch((err) => {
        alert("Error in sending data to server: " + err.message);
      });
  }

  deleteEmployee(id) {
    fetch(`/api/employees/${id}`, { method: "DELETE" }).then((response) => {
      if (!response.ok) console.log("Failed to delete employee");
      else {
        // call loadData to refresh the list of employees and re-render the component
        this.loadData();
      }
    });
  }

  render() {
    return (
      <>
        <h1>Employee Management Application</h1>
        <EmployeeFilter />
        <hr />
        <EmployeeTable
          employees={this.state.employees}
          deleteEmployee={this.deleteEmployee}
        />
        <hr />
        <EmployeeAdd createEmployee={this.createEmployee} />
      </>
    );
  }
}
