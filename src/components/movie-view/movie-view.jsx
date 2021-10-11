import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import { Link } from "react-router-dom";



import "./movie-view.scss";


export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      Favorites: [],
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.setState({ Username: localStorage.getItem("user") });
    this.getUsersFavorites(accessToken);
  }

  getUsersFavorites(accessToken) {
    const user = localStorage.getItem("user");
    axios.get(`https://zanko-my-flix.herokuapp.com/users/${user}/favorites`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        this.setState({
          Favorites: response.data,
        });
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  addToFavorites(movieID) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://zanko-my-flix.herokuapp.com/users/${user}/movies/${movieID}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        this.setState({
          Favorites: response.data.FavoriteMovies
        })
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  removeFromFavorites(movieID) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`https://zanko-my-flix.herokuapp.com/users/${user}/movies/${movieID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        this.setState({
          Favorites: response.data.FavoriteMovies
        })
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;


    return (
      <div className="movie-view">
        <div className="poster-and-button-container">
          <div className="movie-poster-container">
            <img className="movie-poster" src={`/${movie.ImagePath}`} />
          </div>
          {this.state.Favorites.includes(movie._id) ? (
            <button className="favorites-button remove-from-favorites-button" onClick={() => { this.removeFromFavorites(movie._id) }} >Remove from Favorites</button>
          ) : (
            <button className="favorites-button" onClick={() => { this.addToFavorites(movie._id) }} >Add to Favorites</button>
          )}
        </div>
        <div className="movie-info-container">
          <div className="movie-info">
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="link-container">
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
              </Link>
              <div className="spacer" ></div>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="back-button" onClick={() => { onBackClick(null) }}>Back</button>
          <Link to={'/users/' + this.state.Username}>
            <button className="nav-button">Profile</button>
          </Link>
        </div>
      </div >
    );
  }
}

MovieView.proptypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}