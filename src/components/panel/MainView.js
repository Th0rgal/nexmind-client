import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import ResultCard from './cards/ResultCard';
import AddCard from './cards/AddDataCard';
import AddDataForm from './forms/AddDataForm';
import OpenDataForm from './forms/OpenDataForm';
import EditForm from './forms/EditForm';
import DeleteForm from './forms/DeleteForm';

import styles from "../../styles/mainview.module.css"

class MainView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: "",
            results: {},
            display_add_data: false,
            opened_data: null,
            edited_data: null,
            deleted_data: null
        }
    }

    openDeleteModal = (hash) => {
        this.setState({ deleted_data: hash })
    }

    handleSearch = (event) => {
        this.setState({ search: event.currentTarget.value })
    }

    cardClicked = (hash) => {
        this.setState({ opened_data: hash });
    }

    closeWindow = () => {
        this.setState({ display_add_data: false });
    }

    addDataCardClicked = () => {
        this.setState({ display_add_data: true })
    }

    editClicked = (data_details) => {
        console.log("test")
        this.setState({ edited_data: data_details })
    }

    closeEdited = () => {
        this.setState({ edited_data: null })
    }

    closeModification = () => { //associé à OpenDataForm.js 
        this.setState({ opened_data: null })
    }

    closeDelete = () => {
        this.setState({ deleted_data: null })
    }


    handleSearchSubmit = (event) => {
        event.preventDefault();

        this.props.request_manager.sendSearch(this.state.search)
            .then(response => response.json())
            .then(response => this.setState({ results: response["results"] }))
            .catch(() => toast("Failed to perform search", { type: toast.TYPE.ERROR }));
    }

    handleClose = event => {
        if (event.target.id === "smoke") {
            if (this.state.display_add_data)
                this.setState({ display_add_data: false })
            else if (this.state.edited_data)
                this.setState({ edited_data: null })
            else if (this.state.deleted_data)
                this.setState({ deleted_data: null })
            else if (this.state.opened_data)
                this.setState({ opened_data: null })
        }
    }

    displayAddDataModal = () => {
        if (this.state.display_add_data)
            return <AddDataForm request_manager={this.props.request_manager} close={this.closeWindow} />
    }

    displayOpenedDataModal = () => {
        if (this.state.deleted_data)
            return <DeleteForm request_manager={this.props.request_manager} hash={this.state.opened_data} close={this.closeDelete} />
        else if (this.state.edited_data)
            return <EditForm request_manager={this.props.request_manager} data={this.state.results[this.state.opened_data]} close={this.closeEdited} />
        else if (this.state.opened_data)
            return <OpenDataForm request_manager={this.props.request_manager} hash={this.state.opened_data} editClicked={this.editClicked} deleteClicked={() => this.setState({ deleted_data: this.state.opened_data })} close={this.closeModification} />
    }

    render() {
        return (
            <div onClick={this.handleClose} >

                {this.displayAddDataModal()}
                {this.displayOpenedDataModal()}

                <form className="relative max-w-2xl mx-auto px-6 mt-16 mb-8" onSubmit={this.handleSearchSubmit} >
                    <div className={styles.search}><SearchIcon /></div>
                    <input id="search-toggle" onChange={this.handleSearch} type="search" placeholder="Enter categories to search in!" className="block border-2 border-gray-300 w-full focus:outline-none focus:bg-white text-gray-700 font-medium rounded-full pl-12 pr-4 py-2" />
                </form>

                <div className="flex flex-wrap justify-center" >
                    <AddCard cardClicked={this.addDataCardClicked} />
                    {Object.keys(this.state.results).map(
                        hash => <ResultCard cardClicked={() => this.cardClicked(hash)} key={hash} details={this.state.results[hash]} />)}
                </div>
            </div>

        )
    }
}

export default MainView;