import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "./EmployeeSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const handleDetailsEmployee = (employeeId) => {
    console.log(employeeId);
    navigate("/detailEmployee/" + employeeId);
  
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-75">
        <h2 className="text-center mb-4">Employee List</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.lastname}</td>
                <td>{employee.firstname}</td>
                <td>{employee.clockIn}</td>
                <td>{employee.clockOut}</td>
                <td>
                  {/* Utilisation d'une fonction de rappel pour l'événement onClick */}
                  <button className="btn btn-primary" onClick={() => handleDetailsEmployee(employee.id)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;


