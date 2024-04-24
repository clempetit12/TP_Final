import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { updateEmployee } from "./EmployeeSlice";

const UpdateEmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.selectedEmployee);

  const lastnameRef = useRef(null);
  const firstnameRef = useRef(null);
  const emailRef = useRef(null);
  const ageRef = useRef(null);
  const jobRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    // Pré-remplir les champs du formulaire avec les données actuelles de l'employé
    if (employee) {
      lastnameRef.current.value = employee.lastname;
      firstnameRef.current.value = employee.firstname;
      emailRef.current.value = employee.email;
      ageRef.current.value = employee.age;
      jobRef.current.value = employee.jobTitle;
      roleRef.current.value = employee.role;
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: id,
      lastname: lastnameRef.current.value,
      firstname: firstnameRef.current.value,
      email: emailRef.current.value,
      age: ageRef.current.value,
      jobTitle: jobRef.current.value,
      role: roleRef.current.value,
    };

    // Dispatch de l'action de mise à jour de l'employé
    dispatch(updateEmployee(formData));

    // Redirection vers la page des détails de l'employé après la mise à jour
    navigate(`/detailEmployee/${id}`);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-50">
        <h2 className="mb-4">Update Employee</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter lastname" ref={lastnameRef} />
          </Form.Group>

          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter firstname" ref={firstnameRef} />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
          </Form.Group>

          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Enter age" ref={ageRef} />
          </Form.Group>

          <Form.Group controlId="job">
            <Form.Label>Job</Form.Label>
            <Form.Control type="text" placeholder="Enter job" ref={jobRef} />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" ref={roleRef}>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateEmployeeForm;
