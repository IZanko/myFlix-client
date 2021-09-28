import React from 'react';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      PasswordError: "",
      EmailError: "",
      BirthdayError: "",
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(accessToken) {
    let url = 'https://zanko-my-flix.herokuapp.com/users/' +
      localStorage.getItem('user');
    axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: "",
          Email: response.data.Email,
          Birthday: "",
        });
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  /* Handle form update */
  handleUpdate(e) {
    let accessToken = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let validated = this.formValidation();
    if (validated) {
      axios.put(`https://zanko-my-flix.herokuapp.com/users/${user}`,
        {
          Username: user,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
        .then((response) => {
          const data = response.data;
          alert(user + " profile has been updated.");
          window.open('{`/users/${this.props.user}`}', '_self');
        })
        .catch(function (error) {
          alert(error.response.data);
        });
    }
  }

  /* Form Validation Start */

  formValidation() {
    let PasswordError = {};
    let EmailError = {};
    let BirthdayError = {};
    let isValid = true;
    if (this.state.Password.trim().length < 5 || this.state.Password === '') {
      PasswordError.passwordMissing = "You must enter a password at least 6 characters long";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.emailNotEmail = "You must enter a valid email";
      isValid = false;
    }
    console.log(this.state.Birthday);
    if (this.state.Birthday === '' || !this.state.Birthday) {
      BirthdayError.BirthdayEmpty = "You must enter your date of birth";
      isValid = false;
    }
    this.setState({
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdayError: BirthdayError,
    })
    return isValid;
  };

  setField(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }




  render() {
    const { onBackClick, onLoggedOut, onDeregister } = this.props;
    const { PasswordError, EmailError, BirthdayError } = this.state;
    return (
      <Container className="profile-wrapper text-light">
        <Row className="ml-1">
          <h4>Update info for: {`${this.props.user}`}</h4>
        </Row>
        <Form>
          <Form.Group controlId="updateEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="Email" placeholder={`${this.state.Email}`} onChange={(e) => this.setField(e)} required ></Form.Control>
            {Object.keys(EmailError).map((key) => {
              return (
                <div className="error" key={key}>
                  {EmailError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="updateBirthday">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control type="date" name="Birthday" placeholder={`${this.state.Birthday}`} onChange={(e) => this.setField(e)} required></Form.Control>
            {Object.keys(BirthdayError).map((key) => {
              return (
                <div className="error" key={key}>
                  {BirthdayError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="updatePassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" name="Password" placeholder="" onChange={(e) => this.setField(e)} required ></Form.Control>
            {Object.keys(PasswordError).map((key) => {
              return (
                <div className="error" key={key}>
                  {PasswordError[key]}
                </div>
              );
            })}
          </Form.Group>
        </Form>
        <Row>
          <div className="button-container">
            <button className="back-button" onClick={() => { onBackClick(null) }}>Back</button>
            <button type="submit" className="nav-button" onClick={() => this.handleUpdate()} >Submit</button>
            <button className="nav-button" onClick={() => { onLoggedOut() }}>Logout</button>
            <button className="nav-button" type="danger" onClick={() => { onDeregister(this.state.Email) }}>Delete Account</button>

          </div>
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  })
};