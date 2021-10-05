import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import "./registration-view.scss"

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthdate] = useState("");
  const [validated, setValidation] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    validation();
    if (validated) {
      axios.post('https://zanko-my-flix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert("You have registered an account with the username: " + username);
          setValidation(false);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
      props.onRegistration(username);
    };
  }

  /*validate user input before registering user*/
  function validation() {
    const letters = /^[0-9a-zA-Z]+$/;
    !username.match(letters) ? setUsernameError("*only numbers and letters are valid") : setUsernameError("");
    username.length < 4 ? setUsernameError("*required, a minimum of 4 characters") : setUsernameError("");
    password.trim().length < 6 ? setPasswordError("*required, a minimum of 6 characters") : setPasswordError("");
    !email.includes("@") ? setEmailError("*required, a valid email") : setEmailError("");

    /*check if username already exists*/
    {
      axios.patch('https://zanko-my-flix.herokuapp.com/users/check/', {
        Username: username,
      }
      )
        .then(response => {
          const data = response.data;
          String(data) == (username + " is already taken") ? setUsernameError("*" + data) : setUsernameError("");
        })
        .catch(e => {
          console.log('error registering the user')
        });
    }
    (emailError == "" && passwordError == "" && usernameError == "") ? setValidation(true) : setValidation(false);
  }




  return (
    <div className="form-container">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label className="label">Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          <p className="error">{usernameError}</p>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="label">Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          <p className="error">{passwordError}</p>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className="label">Email:</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
          <p className="error">{emailError}</p>
        </Form.Group>
        <Form.Group controlId="formBirthdate">
          <Form.Label className="label">Birth date:</Form.Label>
          <Form.Control type="date" onChange={e => setBirthdate(e.target.value)} />
        </Form.Group>
        <Button className="register-button" variant="primary" type="submit" onClick={handleSubmit}>Register
        </Button>
        <Link to={`/`}>
          <p className="login-instead" variant="link">Login instead</p>
        </Link>
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
  })
};