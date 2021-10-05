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
      Favorites: [],
      FavoritesTitle: [],
      Email: "",
      Birthday: "",
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
        this.getMovieTitle();
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  /*take the movie id's from Favorites array and create a new array with movie titles instead*/
  getMovieTitle() {
    const token = localStorage.getItem("token");
    this.state.Favorites.map((movieID) => {
      axios.get(`https://zanko-my-flix.herokuapp.com/movies/${movieID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
        .then((response) => {
          this.setState({
            FavoritesTitle: this.state.FavoritesTitle.concat(response.data.Title)
          })
        })
        .catch(function (error) {
          alert(error.response.data);
        });
    });

  }



  render() {
    const { onBackClick, onLoggedOut } = this.props;


    return (
      <div className="profile-parent-container">
        <div className="profile-container">
          <div className="profile-info">
            <p className="label-profile">Your Profile Information</p>
            <p className="label-profile">Username: <span className="value-profile">{this.state.Username}</span></p>
            <p className="label-profile">Date of Birth: <span className="value-profile">{this.state.Birthday.toString().slice(0, 10)}</span></p>
            <p className="label-profile">Email: <span className="value-profile">{this.state.Email}</span></p>
            <p className="label-profile">Favorite Movies:</p>
            <div>
              <p className="value">{this.state.FavoritesTitle.map((movie_title) => <li key={movie_title} >{movie_title}</li>)}</p>
            </div>
            <div className="update-button-container">
              <Link to={'/users/' + this.state.Username + '/update'}>
                <button className="nav-button update-button" >Update Profile</button>
              </Link>
            </div>
          </div>

          <Container className="">
            <Row>
              <div className="button-container">
                <button className="back-button" onClick={() => { onBackClick(null) }}>Back</button>
                <button className="nav-button" onClick={() => { onLoggedOut() }}>Logout</button>
              </div>
            </Row>
          </Container>
        </div>
      </div>
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