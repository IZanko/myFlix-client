import React from "react";
import PropTypes from "prop-types";
import inceptionImg from "../../public/images/inception.jpg";



export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="image-path">
          <span className="label">Image-URL: </span>
          <span className="value">{movie.ImagePath}</span>
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