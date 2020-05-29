import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequestsManager from '../../utils/RequestsManager'
import styles from "../../styles/login-box.module.css"

class LoginBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            node_address: "alpha.nexmind.space",
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value })
    }

    handleUrlChange = (event) => {
        let newURL = event.currentTarget.value;

        if (newURL.includes("://"))
            newURL = newURL.split("://")[1];

        this.setState({ node_address: newURL })
    }


    handleLogin = (event) => {
        event.preventDefault();

        const request_manager = new RequestsManager(
            "https://" + (this.state.node_address.endsWith("/")
                ? this.state.node_address
                : this.state.node_address + "/"));

        request_manager.sendLogin(this.state.username, this.state.password)
            .then(response => response.json())
            .then(response => {

                if ("token" in response) {
                    request_manager.setToken(response["token"]);
                    this.props.loginCallback(request_manager);
                } else if ("error" in response)
                    toast(response["error"], { type: toast.TYPE.ERROR });
                else
                    toast("Uhandled exception", { type: toast.TYPE.ERROR });
            })

            .catch(() => toast("Failed to reach node", { type: toast.TYPE.ERROR }));
    }

    render() {
        return (
            <div className={styles.content}>
                <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mx-auto w-64" alt="logo" />

                <form onSubmit={this.handleLogin} className={styles.box} >

                    <div className={styles.field}>
                        <label htmlFor="node_address" className={styles.label}>Node address</label>
                        <input name="node_address" value={this.state.node_address} onChange={this.handleUrlChange} type="text" placeholder="localhost:8080"
                            className={styles.input} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="username"
                            className={styles.input} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="password"
                            className={styles.input} />
                    </div>

                    <button className={styles.submit} >Sign In</button>
                </form>
            </div>
        )
    }
}

export default LoginBox;