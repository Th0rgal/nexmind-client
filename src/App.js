import React from 'react';
import './App.css';
import logo from "./logo.svg";

class App extends React.Component {

  state = {
    search: "",
    spaces: []
  }

  componentDidMount() {
    console.log("test");
    fetch('https://api.spacexdata.com/v3/launches/latest') //to replace by our backend
      .then(res => res.json())
      .then((data) => {
        this.setState({ contacts: data })
        console.log(data)
      })
      .catch(console.log);
  }

  handleChange = (event) => {
    const new_search = event.currentTarget.value;
    this.setState({ search: new_search })

    if (new_search.endsWith(" ")) {
      console.log("test");
    }

  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.search);
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={this.handleSubmit} >
          <input value={this.state.search} onChange={this.handleChange} type="text" placeholder="example" />
          <button>Search</button>
        </form>
        <ul>
          <li>result</li>
        </ul>
      </div>
    );
  }
}

export default App;
