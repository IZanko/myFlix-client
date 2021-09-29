import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenresView } from "../genres-view/genres-view";
import { DirectorView } from "../director-view/director-view";
import { LoginView } from "../log-in-view/log-in-view";
import { RegistrationView } from "../registration-view/registration-view";
import { UpdateProfileView } from "../update-profile-view/update-profile-view";
import { ProfileView } from "../profile-view/profile-view";

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
      user: null,
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
    console.log(localStorage.user + " has been logged out!");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  /**to log out, remove token and user information from local storage*/
  onDeregister(email) {
    let accessToken = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    if (window.confirm('Are you sure you wish to delete this account?')) {
      axios.delete(`https://zanko-my-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }, {
        "username": username,
        "email": email,
      })
        .then(response => {
          // Assign the result to the state
          console.log(response.data);
          this.setState({
            user: null
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }


  render() {
    const { movies, user, registerUser } = this.state;

    return (

      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return movies.map(m => (
              < Col xs={6} sm={4} md={3} key={m._id} >
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView onRegistration={username => this.onRegistration(username)} />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col >
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenresView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          <Route path="/users/:Username/update" render={({ history }) => {
            {/* if(!user) return <Redirect to="/" /> */ }
            if (movies.length === 0) return <div className="main-view" />
            if (!user) return <Redirect to="/" />

            return (
              <Col>
                <UpdateProfileView user={user} onBackClick={() => history.goBack()} onLoggedOut={() => { this.onLoggedOut() }} />
              </Col>
            )
          }
          } />
          <Route exact path="/users/:Username" render={({ history }) => {
            {/* if(!user) return <Redirect to="/" /> */ }
            if (movies.length === 0) return <div className="main-view" />
            if (!user) return <Redirect to="/" />

            return (
              <Col>
                <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} onDeregister={(email) => this.onDeregister(email)} onLoggedOut={() => { this.onLoggedOut() }} />
              </Col>
            )
          }
          } />

        </Row >
      </Router >
    );
  }
}
