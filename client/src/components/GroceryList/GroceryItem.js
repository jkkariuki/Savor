import React from "react";
import "./GroceryList.css";

class GroceryItem extends React.Component {
    render() {
        return (
            <li className="list-group-item itemFont">
                {this.props.children}
            </li>
        )
    }
}

export default GroceryItem;