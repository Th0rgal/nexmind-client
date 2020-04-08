import React from 'react';
import './App.css';
import logo from "./logo.svg";

class App extends React.Component {

  state = {
    search: "",
    node_address: "",
    username: "",
    password: "",
    connected: false
  }

  /*
    Logic (handle forms update, submit and determine the page to display)
  */

  handleChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value })
  }

  handleLogin = (event) => {
    event.preventDefault();


    var details = {
      'username': this.state.username,
      'password': this.state.password
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(this.state.node_address + "login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(response => response.json())
      .then(response => console.log(response));

    this.setState({ connected: true });
    //console.log("connecté: " + this.state.connected);
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.search);
  }

  getContent = () => {
    if (this.state.connected)
      /* searchbar + drag and drop (connected form)*/
      return this.getConnectedPage()
    else
      /* login form*/
      return this.getLoginPage()
  }


  /*
    Page rendering (login form + connected display)
  */

  getLoginPage = () => (
    <form onSubmit={this.handleLogin} >
      <input value={this.state.node_address} name="node_address" onChange={this.handleChange} type="text" placeholder="localhost" />
      <input value={this.state.username} name="username" onChange={this.handleChange} type="text" placeholder="username" />
      <input value={this.state.password} name="password" onChange={this.handleChange} type="text" placeholder="password" />
      <button>Login</button>
    </form>
  )

  getConnectedPage = () => (
    <div>
      <form onSubmit={this.handleSearchSubmi} >
        <input value={this.state.search} name="search" onChange={this.handleChange} type="text" placeholder="example" />
        <button>Search</button>
      </form>
      <ul>
        <li>result</li>
      </ul>
    </div>
  )

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
