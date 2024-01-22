import React from "react";
import { useState } from "react";
import { Badge, Button, Table, Card, Modal } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

import EmployeeAdd from "./EmployeeAdd.jsx";
import EmployeeFilter from "./EmployeeFilter.jsx";

function EmployeeTable({ employees, deleteEmployee }) {
  // GET THE URL
  const { search } = useLocation();
  // Get the parameters in the URL
  const query = new URLSearchParams(search);

  // Get the 'Employed' parameter

  const isEmployed = query.get("employed");

  // return a list of EmployeeRow components
  // now we receive the employees as a prop

  const employeeRows = employees
    .filter((employee) =>
      isEmployed ? String(employee.currentlyEmployed) === isEmployed : true
    )
    .map((employee) => {
      return (
        <EmployeeRow
          key={employee._id}
          employee={employee}
          deleteEmployee={deleteEmployee}
        />
      );
    });
  return (
    <Card>
      <Card.Header as="h5">
        All Employees <Badge bg="secondary">{employeeRows.length}</Badge>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <Table striped size="sm">
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
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

// use functional component and useState hook to add modal functionality
function EmployeeRow({ employee, deleteEmployee }) {
  const [show, setShow] = useState(false);

  function showAlertModal() {
    setShow(true);
  }

  function handleConfirm() {
    deleteEmployee(employee._id);
    setShow(false);
  }

  function handleCancel() {
    setShow(false);
  }

  return (
    <tr>
      <td>
        <Link to={`/edit/${employee._id}`}> {employee.name} </Link>
      </td>
      <td>{employee.extension}</td>
      <td>{employee.email}</td>
      <td>{employee.title}</td>
      <td>{employee.dateHired.toDateString()}</td>
      <td>{employee.currentlyEmployed ? "Yes" : "No"}</td>
      <td>
        <Button variant="danger" size="sm" onClick={showAlertModal}>
          X
        </Button>

        <Modal show={show} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Employee?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this employee?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleConfirm}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
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
        // console.log("Total count of employees: ", data.count);
        data.employees.forEach((employee) => {
          employee.dateHired = new Date(employee.dateHired);
        });
        this.setState({ employees: data.employees });
      });
  }

  // passed to EmployeeAdd to create new employee
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

  // pass down to EmployeeTable and EmployeeRow to delete an employee
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
        <EmployeeAdd createEmployee={this.createEmployee} />
        <EmployeeFilter />
        <EmployeeTable
          employees={this.state.employees}
          deleteEmployee={this.deleteEmployee}
        />
      </>
    );
  }
}
