import React from "react";
import PropTypes from "prop-types";

import "./genres-view.scss";

export class GenresView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div>
        <div className="genre-info-container">
          <div className="genre-info">
            <div >
              <span className="label">Genre: </span>
              <span className="value">{genre.Name}</span>
            </div>
            <div >
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="back-button" onClick={() => { onBackClick(null) }}>Back</button>
        </div>
      </div>
    );

  }
}

GenresView.proptypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.string.isRequired,
  }).isRequired
};