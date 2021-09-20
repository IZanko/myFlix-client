import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./registration-view.scss"

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegistration(username);
  };

  return (
    <div className="form-container">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label className="label">Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="label">Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className="label">Email:</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBirthdate">
          <Form.Label className="label">Birth date:</Form.Label>
          <Form.Control type="date" onChange={e => setBirthdate(e.target.value)} />
        </Form.Group>
        <Button className="register-button" variant="primary" type="submit" onClick={handleSubmit}>Register
        </Button>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  registerUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};