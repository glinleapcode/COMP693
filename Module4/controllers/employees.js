import Employee from "../models/Employee.js";

// controllers/employees.js

const getAllEmployees = async (req, res) => {
  // res.send("Get All Employees");
  try {
    const employees = await Employee.find({});
    res.status(200).json({ employees, count: employees.length });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getEmployee = async (req, res) => {
  // res.send("Get a single employee");
  try {
    let id = req.params.id;
    console.log(req.params);
    const employee = await Employee.findOne({ _id: id });
    res.status(200).json({ employee });
  } catch (err) {
    res.status(500).json({ message: "The employee is not exist" });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ msg: "Employee successfully created", employee });
    // res.status(201).json({ employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  // res.send("create a single employee");
};

const updateEmployee = async (req, res) => {
  // res.send("update an existing employee");
  try {
    let id = req.params.id;
    const employee = await Employee.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  // res.send("delete an employee");
  try {
    const id = req.params.id;
    const employee = await Employee.findOneAndDelete({ _id: id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
