import axios from "axios";

export default {
   // create a route for posting groceries to database
   saveGroceries: function (groceryItem){
       console.log("the save grocery route has been hit " + groceryItem.food);
       console.log(groceryItem)
       return axios.post("/api/groceries", groceryItem);
   },

   //create a route for getting groceries from database
   getGroceries: function(){
       console.log("the get grocery route has been hit");
       return axios.get("/api/groceries")
   },

   //create a route for deleting groceries from database

   deleteGroceries: function(){
       console.log("the delete grocery route has been hit");
   },

   //create a route for making call to api - plugging in food items
   getRecipes: function(groceryItem){
       console.log("the get recipe route has been hit" + groceryItem.food );
       return axios.get("/api/recipes", {params: groceryItem});
   }


};