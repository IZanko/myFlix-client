import React from "react";
import PropTypes from "prop-types";
import inceptionImg from "../../public/images/inception.jpg";
import darkknightImg from "../../public/images/thedarkknight.jpg";
import girlsImg from "../../public/images/girls.jpg";
import interstellarImg from "../../public/images/interstellar.jpg";
import silenceoftheLambsImg from "../../public/images/silenceofthelambs.jpg";
import theprestigeImg from "../../public/images/theprestige.jpg";
import knockedupImg from "../../public/images/knockedup.jpg";
import blackwidowImg from "../../public/images/blackwidow.jpg";
import rachelgettingmarriedImg from "../../public/images/rachelgettingmarried.jpg";

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