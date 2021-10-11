import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";



import "./movie-card.scss";
import { CardImg } from "react-bootstrap";

export class MovieCard extends React.Component {



  render() {
    const { movie } = this.props;


    return (
      <Card >
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">
            <CardImg variant="top" src={movie.ImagePath} className="image-styles" />
          </Button>
        </Link>
      </Card>

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
  }).isRequired
};