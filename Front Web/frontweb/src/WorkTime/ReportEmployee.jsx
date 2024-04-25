import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEmployeeById } from "../Employee/EmployeeSlice";
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getHourWorkedDay, getHourWorkedMonth, getHourWorkedYear, getReport } from "./workTimeSlice";

const ReportEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.employees.selectedEmployee);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const   hourWorkedYear = useSelector(state => state.workTime.  hourWorkedYear);
    const      hourWorkedMonth = useSelector(state => state.workTime.  hourWorkedMonth);
    const    hourWorkedDay = useSelector(state => state.workTime.  hourWorkedDay);
    
    // Générer les options pour les années
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = 1900; year <= currentYear; year++) {
            years.push(<option key={year} value={year}>{year}</option>);
        }
        return years;
    };

    // Générer les options pour les mois
    const generateMonthOptions = () => {
        const months = [
            { value: 1, label: 'Janvier' },
            { value: 2, label: 'Février' },
            { value: 3, label: 'Mars' },
            { value: 4, label: 'Avril' },
            { value: 5, label: 'Mai' },
            { value: 6, label: 'Juin' },
            { value: 7, label: 'Juillet' },
            { value: 8, label: 'Aout' },
            { value: 9, label: 'Septembre' },
            { value: 10, label: 'Octobre' },
            { value: 11, label: 'Novembre' },
            { value: 12, label: 'Décembre' },
        ];
        return months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
        ));
    };

    // Générer les options pour les jours
    const generateDayOptions = () => {
        const days = [];
        for (let day = 1; day <= 31; day++) {
            days.push(<option key={day} value={day}>{day}</option>);
        }
        return days;
    };

    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setSelectedYear(selectedYear);
        const employeeId = employee.id;
        dispatch(getHourWorkedYear({ selectedYear, employeeId }));
    };

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setSelectedMonth(selectedMonth);
        console.log("selectedmonth"+selectedMonth)
        const employeeId = employee.id;
        dispatch(getHourWorkedMonth({ selectedYear, selectedMonth, employeeId }));
    };

    const handleDayChange = (e) => {
        const selectedDay = e.target.value;
        setSelectedDay(selectedDay);
        console.log("day" +selectedDay)
        const employeeId = employee.id;
        dispatch(getHourWorkedDay({ selectedYear, selectedMonth, selectedDay, employeeId }));
    };
  
    useEffect(() => {
        dispatch(getEmployeeById(id));
    }, [dispatch, id]);
   
    return (
        <div className="container ">
          {employee && (
            <div>
              <h1 className="display-5 text-center">Rapport de {employee.firstname} {employee.lastname}</h1>
              <h2 className="display-6 text-center">{employee.jobTitle}</h2>
              <hr />
              <div className="row  justify-content-center ">
                <div className="col-3 ">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-center font-bold">Year</h5>
                      <p className="card-text">
                        <Form>
                          <Form.Select onChange={handleYearChange}>
                            <option value="">Select a year</option>
                            {generateYearOptions()}
                          </Form.Select>
                        </Form>
                      </p>
                      <p>Time worked: {hourWorkedYear && (hourWorkedYear.hourWorkedYear)}</p>
                      <p >Overtime worked: <p className="text-danger">{hourWorkedYear && (hourWorkedYear.overtimeYear)}</p> </p>
                      <p>Total hour: {hourWorkedYear && (hourWorkedYear.overtimeYear + hourWorkedYear.hourWorkedYear )}</p>
                    </div>
                  </div>
                </div>
                <div className="col-3 ">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-center">Month</h5>
                      <p className="card-text">
                        <Form>
                          <Form.Select onChange={handleMonthChange}>
                            <option value="">Select a month</option>
                            {generateMonthOptions()}
                          </Form.Select>
                        </Form>
                      </p>
                      <p>Time worked: {hourWorkedMonth && (hourWorkedMonth.hourWorkedMonth)}</p>
                      <p >Overtime worked: <p className="text-danger">{hourWorkedMonth && (hourWorkedMonth.overtimeMonth)}</p> </p>
                      <p>Total hour worked: {hourWorkedMonth && (hourWorkedMonth.overtimeMonth || 0 + hourWorkedMonth.hourWorkedMonth || 0 )}</p>
                 
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-center">Day</h5>
                      <p className="card-text">
                        <Form>
                          <Form.Select onChange={handleDayChange}>
                            <option value="">Select a day</option>
                            {generateDayOptions()}
                          </Form.Select>
                        </Form>
                      </p>
                      <p>Time worked: {hourWorkedDay && (hourWorkedDay.hourWorkedDay)}</p>
                      <p > Overtime worked: {hourWorkedDay && (hourWorkedDay.overtimeDay)}</p>
                      <p>Total hour worked: {hourWorkedDay && (hourWorkedDay.overtimeDay || 0 +  hourWorkedDay.hourWorkedDay || 0)}</p>
                    </div>
                  </div>
                </div>
              </div>
             
              <hr />
              <h1 className="display-6 text-center">Print report</h1>
              <div className="d-grid gap-2">
                <button className="btn btn-primary">Print</button>
              </div>
            </div>
          )}
        </div>
      );
      

}
export default ReportEmployee;
