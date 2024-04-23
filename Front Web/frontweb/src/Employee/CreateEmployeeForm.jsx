import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createEmployee } from "./EmployeeSlice";

const CreateEmployeeForm = () => {

  const dispatch = useDispatch();

  const lastnameRef = useRef(null);
  const firstnameRef = useRef(null);
  const emailRef = useRef(null);
  const ageRef = useRef(null);
  const jobRef = useRef(null);
  const roleRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      lastname: lastnameRef.current.value,
      firstname: firstnameRef.current.value,
      email: emailRef.current.value,
      age: ageRef.current.value,
      jobTitle: jobRef.current.value,
      role: roleRef.current.value,
    };


    console.log(formData);

     dispatch(createEmployee(formData))

    // Réinitialiser les valeurs du formulaire si nécessaire
    lastnameRef.current.value = "";
    firstnameRef.current.value = "";
    emailRef.current.value = "";
    ageRef.current.value = "";
    jobRef.current.value = "";
    roleRef.current.value = "user";
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="w-50">
        <h2 className="mb-4">Create Employee</h2>
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
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;

