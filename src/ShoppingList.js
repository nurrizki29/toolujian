import React, { Component } from 'react'

export default class ShoppingList extends Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Daftar Belanja untuk {this.props.nama}</h1>
                <ul>
                <li>Instagram</li>
                <li>WhatsApp</li>
                <li>Oculus</li>
                </ul>
            </div>
        )
    }
}
