import React from "react";
import PropTypes from "prop-types";
import "../../public/images/inception.jpg";
import "../../public/images/thedarkknight.jpg";
import "../../public/images/girls.jpg";
import "../../public/images/interstellar.jpg";
import "../../public/images/silenceofthelambs.jpg";
import "../../public/images/theprestige.jpg";
import "../../public/images/knockedup.jpg";
import "../../public/images/blackwidow.jpg";
import "../../public/images/rachelgettingmarried.jpg";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    const imageUrl = require('../../public/images/' + movie.ImagePath);


    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={imageUrl} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={() => { onBackClick(null) }}>Back</button>

      </div>
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