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
                <div className="relative max-w-2xl mx-auto px-6 mt-16 mb-8">
                    <form onSubmit={this.handleSearchSubmit} >
                        <div className="absolute h-10 mt-1 left-0 top-0 flex items-center pl-10"><SearchIcon /></div>
                        <input id="search-toggle" onChange={this.handleSearch} type="search" placeholder="Enter categories to search in!" className="block border-2 border-gray-300 w-full bg-brand-white focus:outline-none focus:bg-white text-gray-700 font-bold rounded-full pl-12 pr-4 py-2" />
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