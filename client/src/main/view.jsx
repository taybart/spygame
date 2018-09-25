import React, { Component } from 'react';
import 'main/styles/app.css';
import io from 'socket.io-client';
import RegistrationForm from 'main/containers/registration-form.js';
import Lobby from 'main/components/lobby.jsx';
import Role from 'main/components/role.jsx';
import UsersLocations from 'main/components/users_locations.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 8 * 60,
      game: {
        users: [],
        locations: [],
      },
      role: ['', ''],
    };
    this.serverUrl = 'http://grove.local:3002';
  }

  componentDidMount() {
    this.socket = io(this.serverUrl);
    this.socket.on('start', (game) => {
      this.props.setGameStatus(true);
      this.setState({ game })
    });

    this.socket.on('reconnect', () => {
      this.socket.emit('join-game', this.props.gameId);
    });
    this.socket.on('time', (time) => {
      this.setState({ time });
    });
    this.socket.on('roles', (roles) => {
      if (roles.spy === this.props.username) {
        this.setState({ role: [ 'spy', null ] });
      } else {
        let role = this.state.game.locations[roles.location]
        role = role[Math.floor(Math.random() * role.length)];
        this.setState({ role: [ role, roles.location ] })
      }
    });
    this.socket.on('timeup', (data) => {
      this.setState({ answers: data });
    });
    fetch(`${this.serverUrl}/places`)
      .then(res => res.json())
      .then(json => {
        this.props.setPlaces(json.places);
      });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startGame = () => {
    fetch(`${this.serverUrl}/start?gameId=${this.props.gameId}`)
      .then(res => { if (res.status === 200) { res.json() } })
      .then(json => {
      });
  }
  resetGame = () => {
    fetch(`${this.serverUrl}/reset?gameId=${this.props.gameId}`)
      .then(res => { if (res.status === 200) { res.json() } })
      .then(json => {
        this.setState({ time: 8 * 60 });
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          if (this.state.time > 0){
            this.setState({ time: this.state.time - 1 })
          } else {
            clearInterval(this.interval);
          }
        }, 1000);
      });
  }


  render() {
    const { game, role, time } = this.state;
    const { isAdmin, gameStatus, gameId } = this.props;
    let view = <RegistrationForm url={this.serverUrl} />;
    if (gameId) {
      if (gameStatus) {
        view = (<div>
          <Role role={role} time={time} />
          <UsersLocations game={game} />
          { isAdmin ?
              <button
                className="btn btn-danger col-12"
                onClick={this.resetGame}
              >
               New Game
              </button>
              : null }
        </div>);
      } else {
        this.socket.emit('join-game', gameId);
        view = <Lobby isAdmin={isAdmin} gameId={gameId} onClick={this.startGame}/>;
      }
    }
    return (
      <div className="app">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col text-center">
              <div className="title">
                Not Spyfall
              </div>
            </div>
          </div>
          <div>{view}</div>
        </div>
      </div>);
  }
}
