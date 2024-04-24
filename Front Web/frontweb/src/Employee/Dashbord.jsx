import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "./EmployeeSlice";
import { useNavigate } from "react-router-dom";
import { getAllWorkTime, getClockIn, getClockOut, getReport } from "../WorkTime/workTimeSlice";
import DatePicker from "react-datepicker";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.employees);
  const worktimes = useSelector((state) => state.workTime.worktimes);
  const clockIn = useSelector((state) => state.workTime.clockIn);
  const clockOut = useSelector((state) => state.workTime.clockOut);

  const getTotalEmployees = () => employees.length;
  const getEmployeesWithClockIn = () => employees.filter(employee => employee.workTimes && employee.workTimes.length > 0 && renderClockIn(employee) !== null).length;



const calculatePercentage = () => {
  const totalEmployees = getTotalEmployees();
  const employeesWithClockIn = getEmployeesWithClockIn();
  console.log('Total Employees:', totalEmployees);
  console.log('Employees with Clock In:', employeesWithClockIn);
  const percentage = totalEmployees > 0 ? ((employeesWithClockIn / totalEmployees) * 100).toFixed(2) : 0;
  console.log('Percentage:', percentage);
  return percentage;
};



  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    return currentDate;
  };

  useEffect(() => {
    dispatch(getAllWorkTime());
    dispatch(getAllEmployees());
  }, [dispatch]);

  const handleDetailsEmployee = (employeeId) => {
    navigate("/detailEmployee/" + employeeId);
  };

  const goToReport = (employeeId) => {
    navigate("/reportEmployee/" + employeeId);
  };

  const getClockInAndOut = (employee) => {
    const clockInsAndOuts = {};
    if (employee.workTimes ) {
      employee.workTimes.forEach((workTime) => {
        if (!clockInsAndOuts[workTime.date]) {
          clockInsAndOuts[workTime.date] = {
            clockIn: null,
            clockOut: null,
          };
        }
        if (workTime.clocking === 'IN' && !clockInsAndOuts[workTime.date].clockIn) {
          clockInsAndOuts[workTime.date].clockIn = workTime.hour;
        }
        if (workTime.clocking === 'OUT') {
          clockInsAndOuts[workTime.date].clockOut = workTime.hour;
        }
      });
    }
    return clockInsAndOuts;
  };
  

  const renderClockIn = (employee) => {
    const clockInsAndOuts = getClockInAndOut(employee);
    return Object.keys(clockInsAndOuts).map((date) => {
      const clockIn = clockInsAndOuts[date].clockIn;
      return (
        <div key={`${employee.id}-${date}-clockIn`}>
          {clockIn && `Clock In: ${clockIn}`}
        </div>
      );
    });
  };
  
  const renderClockOut = (employee) => {
    const clockInsAndOuts = getClockInAndOut(employee);
    return Object.keys(clockInsAndOuts).map((date) => {
      const clockOut = clockInsAndOuts[date].clockOut;
      return (
        <div key={`${employee.id}-${date}-clockOut`}>
          {clockOut && `Clock Out: ${clockOut}`}
        </div>
      );
    });
  };
  

  return (
    <div className="container d-flex justify-content-center " style={{ minHeight: "50vh" }}>
      <div className="w-80">
        <div className="mb-4">
          <h1 className="display-5 text-center fw-bold mt-4">{getCurrentDate()}</h1>
          <hr />
        </div>
        <h2 className="text-center mb-4 display-5">Employee dashboard </h2>
        <table className="table table-responsive-lg">
          <thead>
            <tr className="text-center">
              <th>Employee ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th className="w-15">Clock In</th>
              <th className="w-15">Clock Out</th>
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
                <td>{renderClockIn(employee)}</td>
        <td>{renderClockOut(employee)}</td>
                <td className="text-center">
                  <button className="btn btn-outline-primary" onClick={() => handleDetailsEmployee(employee.id)}>Details</button>
                </td>
                <td>
                  <button className="btn btn-outline-success" onClick={() => goToReport(employee.id)}>Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-start">
        <div className="w-50">
          <p>Total Employees: {getTotalEmployees()}</p>
        </div>

    
        <div className="w-50 text-end">
          <p>Percentage of Employees on Site: {calculatePercentage()}%</p>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Dashboard;
