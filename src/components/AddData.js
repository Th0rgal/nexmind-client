import React from 'react';

import { ReactComponent as AddIcon } from "../icons/plus.svg";

class AddCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-none w-64 rounded-lg overflow-hidden shadow-lg bg-white">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"><AddIcon className="fill-current text-gray-400" /></span>
            </div>
        )
    }
}

export default AddCard;