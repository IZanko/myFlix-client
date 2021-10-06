import React from "react";
import PropTypes from "prop-types";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div>
        <div className="director-info-container">
          <div className="director-info">
            <div >
              <span className="label">Director: </span>
              <span className="value">{director.Name}</span>
            </div>
            <div className="">
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
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

DirectorView.proptypes = {
  movie: PropTypes.shape({
    Director: PropTypes.string.isRequired,
  }).isRequired
};