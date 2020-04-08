import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RequestsManager from './RequestsManager'

toast.configure()

class App extends React.Component {

  state = {
    search: "",
    node_address: "",
    username: "",
    password: "",
    connected: false,

    request_manager: null
  }

  /*
    Logic (handle forms update, submit and determine the page to display)
  */

  handleChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value })
  }

  handleUrlChange = (event) => {
    var newURL = event.currentTarget.value;
    const prefix = "http://";

    if (prefix.startsWith(newURL) && prefix !== newURL)
      newURL = prefix;
    else if (!newURL.startsWith(prefix))
      newURL = prefix + newURL;

    this.setState({ node_address: newURL })
  }

  handleLogin = (event) => {
    event.preventDefault();
    console.log("test");

    // verify URL
    const request_manager = new RequestsManager(
      this.state.node_address.endsWith("/")
        ? this.state.node_address
        : this.state.node_address + "/"
    );

    request_manager.sendLogin(this.state.username, this.state.password)
      .then(response => response.json())
      .then(response => {

        if ("token" in response)
          this.setState({ connected: true });

        else if ("error" in response)
          toast(response["error"], { type: toast.TYPE.ERROR });

        else
          toast("Uhandled exception", { type: toast.TYPE.ERROR });
      })

      .catch(() => toast("Failed to reach node", { type: toast.TYPE.ERROR }));

    //console.log("connecté: " + this.state.connected);
    this.setState({ request_manager: request_manager });
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
    <div className="mx-auto max-w-md" >
      <form onSubmit={this.handleLogin} className="bg-white shadow-md rounded px-8 py-8" >

        <div className="px-4 pb-4">
          <label htmlFor="node_address" className="font-sans text-sm block font-bold text-gray-800 pb-2">Node address</label>
          <input name="node_address" value={this.state.node_address} onChange={this.handleUrlChange} type="text" placeholder="localhost:8080"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
        </div>

        <div className="px-4 pb-4">
          <label htmlFor="username" className="text-sm block font-bold  pb-2">Username</label>
          <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="username"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
        </div>

        <div className="px-4 pb-4">
          <label htmlFor="password" className="text-sm block font-bold pb-2">Password</label>
          <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
        </div>
      </form>
    </div>
  )

  getConnectedPage = () => (
    <div>
      <form onSubmit={this.handleSearchSubmit} >
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
        <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mx-auto w-64" alt="logo" />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
