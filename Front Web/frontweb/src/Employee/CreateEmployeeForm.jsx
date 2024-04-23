import { useRef } from "react";
import { Form, Button } from "react-bootstrap";

const CreateEmployeeForm = () => {
  const lastNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const ageRef = useRef(null);
  const jobRef = useRef(null);
  const roleRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      lastName: lastNameRef.current.value,
      firstName: firstNameRef.current.value,
      email: emailRef.current.value,
      age: ageRef.current.value,
      job: jobRef.current.value,
      role: roleRef.current.value,
    };

    // Vous pouvez traiter les données ici, par exemple, les envoyer à votre API
    console.log(formData);

    // Réinitialiser les valeurs du formulaire si nécessaire
    lastNameRef.current.value = "";
    firstNameRef.current.value = "";
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
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" ref={lastNameRef} />
          </Form.Group>

          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" ref={firstNameRef} />
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
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

