import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

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
import { CardImg } from "react-bootstrap";

export class MovieCard extends React.Component {



  render() {
    const { movie } = this.props;
    let cardImgUrl = require(`../../public/images/${movie.ImagePath}`);

    return (
      <Card >
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">
            <CardImg variant="top" src={cardImgUrl} className="image-styles" />
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