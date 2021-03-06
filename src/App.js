import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginBox from './components/login/LoginBox';
import MainView from './components/panel/MainView';

toast.configure()

class App extends React.Component {

  state = {
    request_manager: null
  }

  loginCallback = (request_manager) => {
    this.setState({
      request_manager: request_manager
    })
  }

  getPage = () => {
    if (this.state.request_manager)
      /* searchbar + drag and drop (connected form)*/
      return <MainView request_manager={this.state.request_manager} />
    else
      /* login form*/
      return <LoginBox loginCallback={this.loginCallback} />
  }

  render() {
    return (
      <div>
        {this.getPage()}
      </div>
    );
  }
}

export default App;
