import React from 'react';
export default (props) => {
  return (<div>
    <button
      className="btn btn-taylor role-show-hide"
      onClick={() => {
        const role = document.getElementById('role');
        role.style.display = role.style.display === 'none' ? 'block' : 'none';
      }}>
      Show/Hide
    </button>
    <div id="role">
    {(props.role[0] === "spy") ?
        <div id="game-location">You are the spy</div>
        :
        <div>
          <div id="game-location">{`Location: ${props.role[1]}` }</div>
          <div id="game-role">{`Role: ${props.role[0]}`}</div>
        </div>
    }
  </div>
    <div id="timer">
      {Math.floor(props.time / 60)}:{props.time % 60 < 10 ? '0' : null }{props.time % 60}
    </div>
  </div>);
}
