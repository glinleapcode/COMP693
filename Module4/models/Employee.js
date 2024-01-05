import mongoose from "mongoose";

const EmployeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this employee."],
    unique: true,
  },
  extension: {
    type: Number,
    required: [true, "Please provide an extension for this employee."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email for this employee."],
  },
  title: {
    type: String,
    required: [true, "Please provide a title for this employee."],
  },
  dateHired: {
    type: Date,
    default: Date.now,
  },
  currentlyEmployed: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Employee", EmployeesSchema);
