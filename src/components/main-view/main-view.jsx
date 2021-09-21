import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../log-in-view/log-in-view";
import { RegistrationView } from "../registration-view/registration-view";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./main-view.scss";


export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  onRegistration(registerUser) {
    this.setState({
      registerUser,
    });
  }

  getMovies(token) {
    axios.get('https://zanko-my-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  /**to log out, remove token and user information from local storage*/
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user, registerUser } = this.state;

    /* If there is not registered user, the RegisterView is rendered. If there is a user registered,
    the user details are *passed as a prop to the LoginView*/
    if (!registerUser)
      return (
        <RegistrationView
          onRegistration={(registerUser) => this.onRegistration(registerUser)}
        />

      );

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <div>
        <button onClick={() => { this.onLoggedOut() }}>Logout</button>
        <Row className="main-view justify-content-md-center">
          {
            selectedMovie
              ? <Col >
                < MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
              </Col >

              : movies.map(movie => (
                <Col
                  xs={6}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3} className="movie-card-column">
                  <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                </Col>
              ))
          }
        </Row >
      </div>
    );
  }
}
