import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import "../../public/images/inception.jpg";
import "../../public/images/thedarkknight.jpg";
import "../../public/images/girls.jpg";
import "../../public/images/interstellar.jpg";
import "../../public/images/silenceofthelambs.jpg";
import "../../public/images/theprestige.jpg";
import "../../public/images/knockedup.jpg";
import "../../public/images/blackwidow.jpg";
import "../../public/images/rachelgettingmarried.jpg";

import "./movie-card.scss"

export class MovieCard extends React.Component {


  render() {
    const { movie, onMovieClick } = this.props;
    let cardImageUrl = require('../../public/images/' + movie.ImagePath);

    return (
      <Card >
        <Card.Img variant="top" src={cardImageUrl} className="image-styles" onClick={() => onMovieClick(movie)} />
      </Card>
      //<div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>
    );
  }
}

MovieCard.proptypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};