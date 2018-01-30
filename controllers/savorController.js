const path = require("path");
const router = require("express").Router();
const axios = require("axios");
const db = require("../models");

const foodFunction = {
    getRecipes: function (req, res) {
        //this route makes a call to the api based on a user's grocery list.
        const ingredients = req.query.food;
        const id = "8dc2b8c8"
        const key = "b468939121e6d4c0b545c707a78606ff"
        console.log(ingredients);


        axios.get("https://api.edamam.com/search?q=" + ingredients + "&app_id=" + id + "&app_key=" + key)
            .then(function (response) {
                // console.log(response.data.hits);
                res.json(response.data.hits);
            }).catch(function (err) {
                console.log(err);
            })

    },


    create: function (req, res) {
        //this route saves the groceries
        console.log("the create route is being hit");
        console.log(JSON.stringify(req.body));
        db.grocerylist
        
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err));

    }
}

router.get("/api/recipes", foodFunction.getRecipes)
router.post("/api/groceries", foodFunction.create)


// If no API routes are hit, send the React app
router.use(function (req, res) {
    console.log("something is off");
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;