import express from "express";
import {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employees.js";
const router = express.Router();

// chain the HTTP methods to the route, same as:
// router.get("/", getAllEmployees);
// router.post("/", createEmployee);

router.route("/api/employees").get(getAllEmployees).post(createEmployee);

router
  .route("/api/employees/:id")
  // .get(getEmployee)
  // .patch(updateEmployee)
  .delete(deleteEmployee);

export default router;
