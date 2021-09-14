import React from "react";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../log-in-view/log-in-view";
import { RegistrationView } from "../registration-view/registration-view";


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
    axios.get("https://zanko-my-flix.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
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

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user,
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
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie) }} />
          : movies.map(movie => (<MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />))}
      </div>
    );
  }
}
