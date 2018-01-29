import React from "react";
import "./Recipes.css";

class Recipes extends React.Component {
    render() {
        return (
            <li className="list-group">
                {this.props.children}
            </li>
        )
    }
}

export default Recipes;