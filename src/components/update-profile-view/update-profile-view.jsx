import React from 'react';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import './update-profile-view.scss';

export class UpdateProfileView extends React.Component {
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
          Favorites: response.data.FavoriteMovies,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
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
          window.open(`/users/${this.props.user}`, '_self');
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
    const { onBackClick, onDeregister } = this.props;
    const { PasswordError, EmailError, BirthdayError } = this.state;

    return (
      <div className="update-profile-parent-container">
        <div className="update-profile-container">
          <div className="input-container">
            <Form>
              <Form.Group controlId="displayUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder={`${this.state.Username}`} readOnly ></Form.Control>
              </Form.Group>
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
          </div>
          <div>
            <div className="submit-changes-button">
              <button type="submit" className="nav-button" onClick={() => this.handleUpdate()} >Submit Changes</button>
            </div>
          </div>
          <div>
            <div className="button-container">
              <button className="back-button" onClick={() => { onBackClick(null) }}>Back</button>
              <button className="delete-button" onClick={() => { onDeregister(this.state.Email) }}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  })
};