import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById, deleteEmployee } from "./EmployeeSlice";
import { useEffect } from "react";

const DetailsEmployee = () => {
    const { id } = useParams();
    const employee = useSelector((state) => state.employees.selectedEmployee);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getEmployeeById(id));
    }, [dispatch, id]);
  
    const handleDeleteEmployee = () => {
      dispatch(deleteEmployee(id));
      navigate("/");
    };

    const updateDeleteEmployee = ()=>{
        navigate("/updateEmployee/"+id)
    }
  
    if (!employee) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="card w-50 p-3">
          <div className="card-body">
            <h5 className="card-title">Employee Details</h5>
            <p className="card-text">Id Employee: {employee.id}</p>
            <p className="card-text">LastName: {employee.lastname}</p>
            <p className="card-text">FirstName: {employee.firstname}</p>
            <p className="card-text">Job Title: {employee.jobTitle}</p>
            <p className="card-text">Age: {employee.age}</p>
            <p className="card-text">Email: {employee.email}</p>
  
            <div className="mt-3">
              <button className="btn btn-danger mr-2" onClick={handleDeleteEmployee}>Delete</button>
              <button className="btn btn-primary mr-2"onClick={updateDeleteEmployee}>Edit</button>
              <button className="btn btn-secondary">Rapport</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DetailsEmployee;
