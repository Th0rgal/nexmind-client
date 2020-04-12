import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as SearchIcon } from "../icons/search.svg";
import ResultCard from './ResultCard';
import AddCard from './AddData';

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
                <div className="relative text-gray-600 flex content-center justify-center">
                    <form onSubmit={this.handleSearchSubmit} >
                        <input value={this.state.search} onChange={this.handleSearch} type="search" name="serch" placeholder="Search" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none" />
                        <button type="submit" className="fixed right-0 top-0 mt-3 mr-4">
                            <SearchIcon />
                        </button>
                    </form>
                </div>

                <div className="flex flex-wrap" >
                    <AddCard />
                    {Object.keys(this.state.results).map(
                        hash => <ResultCard key={hash} hash={hash} details={this.state.results[hash]} />)}
                </div>
            </div>

        )
    }
}

export default MainView;