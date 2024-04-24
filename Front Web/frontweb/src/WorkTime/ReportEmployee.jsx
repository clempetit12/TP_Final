import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getEmployeeById } from "../Employee/EmployeeSlice";
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getReport } from "./workTimeSlice";

const ReportEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.employees.selectedEmployee);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const report = useSelector(state => state.workTime.report);
    
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
        dispatch(getReport({ selectedYear, selectedMonth, selectedDay, employeeId }));
    };

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setSelectedMonth(selectedMonth);
        console.log("selectedmonth"+selectedMonth)
        const employeeId = employee.id;
        dispatch(getReport({ selectedYear, selectedMonth, selectedDay, employeeId }));
    };

    const handleDayChange = (e) => {
        const selectedDay = e.target.value;
        setSelectedDay(selectedDay);
        console.log("day" +selectedDay)
        const employeeId = employee.id;
        dispatch(getReport({ selectedYear, selectedMonth, selectedDay, employeeId }));
    };
  
    useEffect(() => {
        dispatch(getEmployeeById(id));
    }, [dispatch, id]);
   
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            {employee && (
                <div>
                    <h1 className="display-5 text-center">Rapport de {employee.firstname} {employee.lastname}</h1>
                    <h2 className="display-6 text-center">{employee.jobTitle}</h2>
                    <hr />
                    <div className="d-inline-block p-4"> {/* Première colonne */}
                    <Form>
                        <h1 className="text-center">Année</h1>
                        <Form.Select onChange={handleYearChange}>
                            <option value="">Sélectionner une année</option>
                            {generateYearOptions()}
                        </Form.Select>
                    </Form>
                </div>
                <div className="d-inline-block p-4"> {/* Deuxième colonne */}
                    <Form>
                        <h1 className="text-center">Mois</h1>
                        <Form.Select onChange={handleMonthChange}>
                            <option value="">Sélectionner un mois</option>
                            {generateMonthOptions()}
                        </Form.Select>
                    </Form>
                </div>
                <div className="d-inline-block p-4"> {/* Troisième colonne */}
                    <Form>
                        <h1 className="text-center">Jour</h1>
                        <Form.Select onChange={handleDayChange}>
                            <option value="">Sélectionner un jour</option>
                            {generateDayOptions()}
                        </Form.Select>
                    </Form>
                </div>
            <div className="p-5">
            {report && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Month</th>
                                    <th scope="col">Day</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Time worked</th>
                                    <td>{report.hourWorkedYear}</td>
                                    <td>{report.hourWorkedMonth}</td>
                                    <td>{report.hourWorkedDay}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Overtime worked</th>
                                    <td>{report.overtimeYear}</td>
                                    <td>{report.overtimeMonth}</td>
                                    <td>{report.overtimeDay}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Total Hours</th>
                                    <td>{report.overtimeYear + report.hourWorkedYear} </td>
                                    <td>
    {(!isNaN(report.overtimeMonth) && !isNaN(report.overtimeMonth)) 
        ? report.overtimeMonth + report.overtimeMonth 
        : ''}
</td>

                                    <td>{report.overtimeDay + report.overtimeDay}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}

            </div>
                    
                    <hr />
                 
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary">Print</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportEmployee;
