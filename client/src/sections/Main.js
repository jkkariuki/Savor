import React from "react";
import API from "../utils/API";
import { GroceryList, GroceryItem } from "../components/GroceryList";
import { Recipes, IndividualRecipes } from "../components/Recipes";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groceries: [],
            apiParams: [],
            recipex: [],
            foodItem: "",
            purchased: false,
            use: false
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
            })
            .then(() => this.getRecipes(this.state.groceries))

    }

    deleteGroceries = (item) => {
        console.log("the main file delete route is being hit" + item);
        API.deleteGroceries(item)
            .then(() => this.getGroceries())
            .catch(err => console.log(err));
    }

    purchaseGroceries = (id) => {
        console.log("purchased item " + id);
        API.updateGroceries(id, { purchased: true })
            .then((res) => console.log(res))
            .then(() => this.getGroceries())
    }

    useGroceries = (id) => {
        console.log("used item " + id);

        if (this.state.use === false) {
            this.setState({ use: true })
            API.useGroceries(id, { use: true })
                .then((res) => console.log(res))
                .then(() => this.getGroceries())
        } else {
            this.setState({ use: false })
            API.useGroceries(id, { use: false })
                .then((res) => console.log(res))
                .then(() => this.getGroceries())
        }
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
            .then(this.setState({ foodItem: "" }))
            .catch(err => console.log("Save error:" + err))

        // console.log("the handlesubmit button has been hit " + this.state.foodItem)
    }


    getRecipes = (groceries) => {
        console.log(groceries);
        let array = []


        array = this.state.groceries.map(item => {
            if (item.use === true) {
               return item.food;
            }
             
        })
        this.getRecipes2(array);
        
    }

    getRecipes2 = (array) => {
        const context = this;
        console.log(array);
        this.setState({ apiParams: array })
        console.log("api parms " + this.state.apiParams);
        API.getRecipes({
            food: this.state.apiParams
        })
            .then(function (data) {
                console.log("this is the api data " + data);
                let apiData = []
                for (let i = 0; i < data.data.length; i++) {
                    apiData.push(data.data[i].recipe)
                }
                console.log(apiData);
                context.setState({ recipex: apiData })
                console.log(this.state.recipex);
            }).catch(function (err) {
                console.log(err);
            })

    }




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
                                if (item.purchased === true && item.use === false) {
                                    return (
                                        <GroceryItem>
                                            <strong>
                                                <strike> {"Item: " + item.food}</strike>
                                                <br />

                                            </strong>

                                            <button
                                                onClick={() => this.deleteGroceries(item._id)}
                                            >Delete
                                    </button>

                                            <button
                                                onClick={() => this.useGroceries(item._id)}
                                            >Query Recipe
                                    </button>
                                        </GroceryItem>
                                    );
                                } else if (item.purchased === true && item.use === true) {
                                    return (
                                        <GroceryItem>
                                            <strong>
                                                <strike> {"Item: " + item.food}</strike>
                                                <h4> ✓</h4>
                                            </strong>

                                            <button
                                                onClick={() => this.deleteGroceries(item._id)}
                                            >Delete
                                    </button>
                                            <button
                                                onClick={() => this.useGroceries(item._id)}
                                            >Remove from Recipe
                                    </button>
                                        </GroceryItem>
                                    );
                                }
                                else {
                                    return (
                                        <GroceryItem>
                                            <strong>
                                                {"Item: " + item.food}
                                                <br />

                                            </strong>
                                            <button
                                                onClick={() => this.purchaseGroceries(item._id)}
                                            >Purchased
                                    </button>
                                            <button
                                                onClick={() => this.deleteGroceries(item._id)}
                                            >Delete
                                    </button>
                                        </GroceryItem>
                                    );
                                }
                            })}

                        </GroceryList>
                    </div>


                    <div className="recipeSection col-lg-6 col-md-6 col-sm-6">
                        <h4 className="sectionTitle">Recipes</h4>
                        <br />
                        <Recipes>
                            {this.state.recipex.map(recipe => {

                                return (
                                    <IndividualRecipes>
                                        <strong>
                                            {"Recipe for: " + recipe.label}
                                        </strong>
                                    </IndividualRecipes>
                                )
                            })}
                        </Recipes>
                    </div>

                </div>


            </div>
        )
    }
}

export default Main;