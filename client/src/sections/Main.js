import React from "react";
import API from "../utils/API"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groceries: [],
            foodItem: ""
        };
    }

    handleChange = (event) => {
        console.log(event);
        const target = event.target;
        console.log(event.target);
        const value = target.value
        console.log(target.value);
        const name = target.name;
        console.log(target.name);


        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // API.saveGroceries({
           API.getRecipes({ 
           food : this.state.foodItem
        }).then(function (data) {
            console.log(data);
    
    
        }).catch(function (err) {
            console.log(err);
        })

        // console.log("the handlesubmit button has been hit " + this.state.foodItem)
    }
     



    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="title">Savor</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="enterFoodItem">
                            Add Food to Grocery List
                            <br/>
                            <input className="inputField" name="foodItem" type="text" value={this.state.foodItem} onChange={this.handleChange} />
                            <br/>
                            <br/>
                            <input className="button" type="submit" value="Submit" />   
                        </label>
                    </form>
                </div>
            </div>
        )
    }
}

export default Main;