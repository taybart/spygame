import React from 'react';
export default (props) => {
  return (
    <div id="users-locations">
      Users
      <div className="row">
        {props.game.users
            .map(u => <button
              key={u}
              className="btn btn-choice col-6"
              onClick={(e) => e.target.classList.toggle('off')}
            >
              {u}
            </button>)
        }
      </div>
      Locations
      <div className="row">
        {Object.keys(props.game.locations)
            .map(l => <button
              key={l}
              className="btn btn-choice col-6"
              onClick={(e) => e.target.classList.toggle('off')}
            >
              {l}
            </button>)
        }
      </div>
    </div>
  );
}
