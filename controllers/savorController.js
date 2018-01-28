const path = require("path");
const router = require("express").Router();
const axios = require("axios");
// const db = require("../models");

const foodFunction = {
    getRecipes: function (req, res){
        // console.log(JSON.stringify(req.body.food));
        console.log(req);
        console.log(" LINE 9 " + req.body);// console.log("Hello " + req.body);
        res.send(req.body || "Not req");
    }
}

router.get("/api/recipes", foodFunction.getRecipes)


// If no API routes are hit, send the React app
router.use(function (req, res) {
    console.log("something is off");
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;