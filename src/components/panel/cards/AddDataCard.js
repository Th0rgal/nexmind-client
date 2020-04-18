import React from 'react';

import { ReactComponent as AddIllustration } from "../../../illustrations/add_file.svg";

class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            description: "",
            hash: "",
            chunk: 0,
            spaces: "",
            file: null
        };
    }

    handleClick = () => {
        this.props.dataCardClicked();
    }

    render() {
        return (
            <div onClick={this.handleClick} className="flex flex-col cursor-pointer content-center items-center mx-4 my-4 flex-none w-64 rounded-lg overflow-hidden shadow-lg bg-white flex">
                <AddIllustration className="my-4 flex text-gray-400 w-48 h-32 items-center" />
                <p className="mx-4 my-4 text-gray-700 text-base text-center">Save a piece of data to your node and start enjoying it.</p>
            </div>
        )
    }
}

export default AddCard;