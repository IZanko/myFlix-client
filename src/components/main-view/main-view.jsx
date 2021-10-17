import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { MovieView } from "../movie-view/movie-view";
import { GenresView } from "../genres-view/genres-view";
import { DirectorView } from "../director-view/director-view";
import { LoginView } from "../log-in-view/log-in-view";
import { RegistrationView } from "../registration-view/registration-view";
import { UpdateProfileView } from "../update-profile-view/update-profile-view";
import { ProfileView } from "../profile-view/profile-view";



import "./main-view.scss";


class MainView extends React.Component {


  componentDidMount() {


    let accessToken = localStorage.getItem('token');

    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      /*Load movie data */
      this.getMovies(accessToken);

      /*Check if username saved in localStorage matches a username in the database, if no match, clear localStorage*/
      axios.patch('https://zanko-my-flix.herokuapp.com/users/check/', {
        Username: this.props.user,
      }
      )
        .then(response => {
          const data = response.data;
          String(data) == (this.props.user + " is already taken") ? '' : window.localStorage.clear();
        })
        .catch(e => {
          console.log(e);
        });
    } else { this.onLoggedOut() }
  }


  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  getMovies(token) {
    axios.get('https://zanko-my-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  /**to log out, remove token and user information from local storage*/
  onLoggedOut() {
    console.log(localStorage.user + " has been logged out!");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(null);
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
          this.props.setUser(null);
        })
        .catch(function (error) {
          console.log(error);
        });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }


  render() {
    let { movies, user } = this.props;

    return (

      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <MoviesList movies={movies} />;
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
                <UpdateProfileView user={user} onBackClick={() => history.goBack()} onDeregister={(email) => this.onDeregister(email)} />
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
                <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} onLoggedOut={() => { this.onLoggedOut() }} />
              </Col>
            )
          }
          } />

        </Row >
      </Router >
    );
  }
}
let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);