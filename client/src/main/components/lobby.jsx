import React from 'react';
export default (props) =>
  (<div>
    <div className="row justify-content-center pt-5">
      <div className="col-8 text-center">
        GameID: {props.gameId}
      </div>
    </div>
    { props.isAdmin === true ?
        <div className="row justify-content-center pt-5">
          <div className="col-8 text-center">
            <button
              className="btn btn-taylor"
              onClick={props.onClick}
            >
              Start Game
            </button>
          </div>
        </div>
        : null
    }
  </div>);
