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
            <div className="max-w-sm rounded overflow-hidden shadow-lg">

                <div className="bg-gray-900">
                    <ImageIcon  className="w-full fill-current text-gray-700" />
                </div>

                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{this.state.name}</div>
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