import React from 'react';

import { ReactComponent as ImageIcon } from "../icons/image.svg";

class ResultCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hash: props.hash,
            name: props.details["name"],
            type: props.details["type"],
            description: props.details["desc"],
            spaces: props.details["spaces"]

        }
    }

    render() {
        return (
            <div className="flex-none w-64 rounded overflow-hidden shadow-lg">

                <div className="flex bg-gray-900">
                    <ImageIcon className="flex-none py-5 w-16 justify-center fill-current text-gray-700" />
                    <div className="flex-none font-bold text-xl mb-2 text-gray-200">{this.state.name}</div>
                </div>

                <div className="px-6 py-4">
                    <p className="text-gray-700 text-base">
                        {this.state.description}
                    </p>
                </div>
                <div className="px-6 py-4">
                    {this.state.spaces.map((space, index) =>
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{"#" + space}</span>)}
                </div>
            </div>
        )
    }
}

export default ResultCard;