import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ResultCard from './ResultCard';

class MainView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: "",
            results: {}
        }
    }

    handleSearch = (event) => {
        this.setState({ search: event.currentTarget.value })
    }

    handleSearchSubmit = (event) => {
        event.preventDefault();

        this.props.request_manager.sendSearch(this.state.search)
            .then(response => response.json())
            .then(response => this.setState({ results: response["results"] }))
            .catch(() => toast("Failed to perform search", { type: toast.TYPE.ERROR }));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSearchSubmit} >
                    <input value={this.state.search} onChange={this.handleSearch} type="text" placeholder="example" />
                    <button>Search</button>
                </form>

                <div className="flex gap-4" >
                    {Object.keys(this.state.results).map(
                        hash => <ResultCard key={hash} hash={hash} details={this.state.results[hash]} />)}
                </div>
            </div>
        )
    }
}

export default MainView;