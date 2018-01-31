import React from "react";
import API from "../utils/API";
import { GroceryList, GroceryItem } from "../components/GroceryList";
import { Recipes, IndividualRecipes } from "../components/Recipes";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groceries: [],
            foodItem: "",
            purchased: false
        };
    }


    //when the page loads the getGroceries function is called
    componentDidMount() {
        this.getGroceries();
    }

    //this function retrieves groceries from the database, loops through them, pushes them to an array and then updates the states of groceries with that array.

    getGroceries = () => {
        console.log("the getGrocery function has been hit");
        API.getGroceries()
            .then(res => {
                console.log(res);
                let savedItems = []
                for (let i = 0; i < res.data.length; i++) {
                    savedItems.push(res.data[i])
                }
                this.setState({ groceries: savedItems })
                console.log("groceries " + this.state.groceries);
            }
            )

    }

    deleteGroceries = (item) => {
        console.log("the main file delete route is being hit" + item);
        API.deleteGroceries(item)
        .then (() => this.getGroceries())
        .catch(err => console.log(err));
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

        API.saveGroceries({
            food: this.state.foodItem,
            purchased: false
        })
            .then(() => this.getGroceries())
            .catch(err => console.log("Save error:" + err))

        // console.log("the handlesubmit button has been hit " + this.state.foodItem)
    }


    // getRecipes = () {
    //     API.getRecipes({
    //         food: this.state.foodItem
    //     }).then(function (data) {
    //         console.log(data);


    //     }).catch(function (err) {
    //         console.log(err);
    //     })

    // }




    render() {
        return (
            <div>
                <div id="searchContainer" className="container">
                    <h1 className="title">Savor</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="enterFoodItem">
                            Add Food to Grocery List
                            <br />
                            <input className="inputField" name="foodItem" type="text" value={this.state.foodItem} onChange={this.handleChange} />
                            <br />
                            <br />
                            <input className="button" type="submit" value="Submit" />
                        </label>
                    </form>
                </div>

                <div id="responseContainer" className="container">

                    <div className="grocerySection  col-lg-6 col-md-6 col-sm-6">
                        <h4 className="sectionTitle">Grocery List</h4>
                        <br />
                        <GroceryList>
                            {this.state.groceries.map(item => {
                                return (
                                    <GroceryItem>
                                        <strong>
                                            {"Item: " + item.food}
                                            <br />
                                            {/* {"purchased: " + item.purchased}
                                        <br /> */}
                                        </strong>
                                        <button
                                        onClick={() => this.deleteGroceries(item._id)}
                                        >Delete
                                    </button>
                                    </GroceryItem>
                                );

                            })}

                        </GroceryList>
                    </div>


                    <div className="recipeSection col-lg-6 col-md-6 col-sm-6">
                        <h4 className="sectionTitle">Recipes</h4>
                        <br />
                        <Recipes>

                        </Recipes>
                    </div>

                </div>


            </div>
        )
    }
}

export default Main;