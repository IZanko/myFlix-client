import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./log-in-view.scss"

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://zanko-my-flix.herokuapp.com/users/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        console.log(username + " has logged in!")
        props.onLoggedIn(data);
      })
      .catch(e => {
        alert('user and password do not match');
      });
  };
  /* then call props.onLoggedIn(username) */


  return (
    <div className="form-container">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label className="label" >Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="label">Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button className="submit-button" variant="primary" type="submit" onClick={handleSubmit}>Log In
        </Button>
        <Link to={`/register`}>
          <p className="register-instead" >Register instead</p>
        </Link>

      </Form>
    </div>
  );
}

LoginView.proptypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};