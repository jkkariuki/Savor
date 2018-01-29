const path = require("path");
const router = require("express").Router();
const axios = require("axios");
// const db = require("../models");

const foodFunction = {
    getRecipes: function (req, res){
        const ingredients = req.query.food;
        const id = "${12140cd6}"
        const key = "${36d786cde038c9498b23eb1b8c0b8d97}"
        console.log(ingredients);
        

        axios.get("https://api.edamam.com/search?q=" + ingredients + "&app_id=" + id + "&app_key=" + key).then(function(data){
            res.json(data.data);
        }).catch(function(err){
            console.log(err);
        })
        // console.log(JSON.stringify(req.body.food));
        // console.log(req.query.food);
        // console.log(" LINE 9 " + req.body);// console.log("Hello " + req.body);
        // res.send(req.query || "Not req");
    }
}

router.get("/api/recipes", foodFunction.getRecipes)


// If no API routes are hit, send the React app
router.use(function (req, res) {
    console.log("something is off");
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;