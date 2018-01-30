import React from "react";
import "./Recipes.css";

class Recipes extends React.Component {
    render() {
        return (
            <ul className="list-group">
                {this.props.children}
            </ul>
        )
    }
}

export default Recipes;