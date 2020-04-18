import React from 'react';

import { ReactComponent as ImageIcon } from "../icons/image.svg";
import { ReactComponent as NoteIcon } from "../icons/annotation.svg";
import { ReactComponent as LinkIcon } from "../icons/link.svg";
import { ReactComponent as DocumentIcon } from "../icons/document.svg";
import { ReactComponent as PresentationIcon } from "../icons/presentation.svg";
import { ReactComponent as FileIcon } from "../icons/file.svg";

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

    handleClick = () => {
        console.log("it works!")
        //todo: open download window
    }


    getColors = () => {
        switch (this.state.type) {
            case 'image':
                return "bg-purple-200 text-purple-600"

            case 'note':
                return "bg-red-200 text-red-600"

            case 'link':
                return "bg-blue-200 text-blue-600"

            case 'document':
                return "bg-green-200 text-green-600"

            case 'presentation':
                return "bg-orange-200 text-orange-600"

            default:
                return "bg-indigo-200 text-indigo-600"
        }
    }

    getIcon = () => {
        console.log(this.state.type);
        switch (this.state.type) {

            case 'image':
                return <ImageIcon className="mt-1 w-8" />

            case 'note':
                return <NoteIcon className="mt-1 w-8" />

            case 'link':
                return <LinkIcon className="mt-1 w-8" />

            case 'document':
                return <DocumentIcon className="mt-1 w-8" />

            case 'presentation':
                return <PresentationIcon className="mt-1 w-8" />

            default:
                return <FileIcon className="mt-1 w-8" />
        }
    }

    render() {
        return (
            <div className="flex-none w-64 rounded-lg overflow-hidden shadow-lg bg-white mx-4 my-4">
                <div>
                    <div onClick={this.handleClick} className={"cursor-pointer flex px-2 py-5 font-bold fill-current " + this.getColors()}>
                        {this.getIcon()}
                        {this.state.name}
                    </div>

                    <div className="px-6 py-4">
                        <p className="h-20 text-gray-700 text-base">
                            {this.state.description}
                        </p>
                    </div>
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