import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "./EmployeeSlice";
import { useNavigate } from "react-router-dom";
import { getAllWorkTime, getReport } from "../WorkTime/workTimeSlice";
import DatePicker from "react-datepicker";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.employees);
  const worktimes =  useSelector((state) => state.workTime.worktimes);

  const getCurrentDate = () => {
    const date = new Date();
    console.log("date" + date)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    console.log("day"+day)
    const currentDate = `${year}-${month}-${day}`
    return currentDate;
  };


  

  const goToReport = (employeeId) => {
    navigate("/reportEmployee/"+employeeId)
  }

  
  useEffect(() => {
    dispatch(getAllWorkTime())
    console.log(worktimes)
    dispatch(getAllEmployees());
  }, [dispatch]);

  const handleDetailsEmployee = (employeeId) => {
    console.log(employeeId);
    navigate("/detailEmployee/" + employeeId);
  
  };


  return (
    <div className="container d-flex justify-content-center p-5 " style={{ minHeight: "100vh" }}>
      <div className="w-75">
        <div>
          <h1 className="display-5 text-center  fw-bold  ">{getCurrentDate()}</h1>
          <hr  />
        </div >
        <h2 className="text-center   mb-4">Employee List</h2>
        <table className="table ">
          <thead>
            <tr className="text-center">
              <th>Employee ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Details</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="text-center">
                <td>{employee.id}</td>
                <td>{employee.lastname}</td>
                <td>{employee.firstname}</td>
                <td>{employee.clockIn}</td>
                <td>{employee.clockOut}</td>
                <td className="text-center">
                  <button className="btn btn-outline-primary" onClick={() => handleDetailsEmployee(employee.id)}>Details</button>
                </td>
                <td>
                  <button className="btn btn-outline-success" onClick={() =>goToReport(employee.id)}>Report</button>
                
                </td>
              </tr>
            ))}

{worktimes.map((w) => (
              <tr key={w.id} className="text-center">
                <td>{w.clocking}</td>
                
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    
  );
};

export default Dashboard;


