import React from "react";
import "./Recipes.css";

class Recipes extends React.Component {
    render() {
        return (
            <div className="list-overflow-container">
                <ul className="list-group">
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default Recipes;