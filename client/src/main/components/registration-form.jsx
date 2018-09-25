import React, { Component } from 'react';
import Select from 'react-select';
import 'main/styles/registration-form.css';

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      formType: 'join',
    };
    this.places = [];
  }

  submitReg = (e) => {
    e.preventDefault();
    if (this.usernameInput.value === '') {
      this.setState({ error: 'Please enter a username' });
    } else {
      if (this.state.formType === 'join') {
        let body = {
          username: this.usernameInput.value,
          gameId: this.gameId.value,
        };
        this.props.setUsername(this.usernameInput.value);
        body = JSON.stringify(body);
        fetch(`${this.props.url}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }).then(res => res.json())
          .then(json => {
            if (json.status === 'OK') {
              this.props.setGameId(json.data.gameId);
            } else {
              this.setState({ error: json.msg });
            }
          });
      } else {
        let body = {
          username: this.usernameInput.value,
          places: this.places,
        };
        this.props.setUsername(this.usernameInput.value);
        body = JSON.stringify(body);
        fetch(`${this.props.url}/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }).then(res => res.json())
          .then(json => {
            if (json.status === 'OK') {
              this.props.setGameId(json.data.gameId);
              this.props.setAdminStatus(true);
            }
          });
      }
    }
  }

  render() {
    const { error } = this.state;
    const { places } = this.props;
    return (<div className="container registration-form">
      <div className="row justify-content-center">
        <div className="col text-center">
          <form onSubmit={this.submitReg}>
            <div className="form-group">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={`btn btn-taylor ${this.state.formType === 'join' ? 'active':''}`}>
                  <input
                    type="radio"
                    name="form-type"
                    id="form-type-join"
                    value="join"
                    checked={this.state.formType === 'join'}
                    onChange={e => this.setState({ formType: e.target.value })}
                  />
                  Join Game
                </label>
                <label className={`btn btn-taylor ${this.state.formType === 'new' ? 'active':''}`}>
                  <input
                    type="radio"
                    name="form-type"
                    id="form-type-new"
                    value="new"
                    checked={this.state.formType === 'new'}
                    onChange={e => this.setState({formType: e.target.value})}
                  />
                  New Game
                </label>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="username-input"
                placeholder="Enter username..."
                ref={input => this.usernameInput = input}
              />
            </div>
            <div className="form-group">
              {this.state.formType === 'new' ?
                  <Select
                    options={places}
                    isMulti
                    closeMenuOnSelect={false}
                    blurInputOnSelect={false}
                    name="places"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={selectedOptions => this.places = selectedOptions}
                  /> :
                  <input
                    type="tel"
                    className="form-control"
                    id="gameId-input"
                    placeholder="Enter game id..."
                    ref={input => this.gameId = input}
                  />}
                </div>
                <button type="submit" className="col-12 btn btn-taylor">Submit</button>
              </form>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-8 text-center error">
              {error}
            </div>
          </div>
        </div>);
  }
}
