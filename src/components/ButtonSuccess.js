import React, { Component } from 'react'

export default class ButtonSuccess extends Component {
    render() {
        return (
            <div>
                <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                {this.props.children}
                </button>
            </div>
        )
    }
}
