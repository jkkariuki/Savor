import axios from "axios";

export default {
   //  route for posting groceries to database
   saveGroceries: function (groceryItem){
     
       return axios.post("/api/groceries", groceryItem);
   },

   //route for getting groceries from database
   getGroceries: function(currentUser){
       
       return axios.get("/api/groceries", {params :currentUser});
   },

   // route for deleting groceries from database
   deleteGroceries: function(id){
       
       return axios.delete("/api/groceries" + id);
   },
   
   // route for updating whether the groceries have been purchased (boolean)
   updateGroceries: function(id, update){
       
       return axios.patch("/api/groceries" + id, update );
   },

   // route for updating whether purchased groceries are being used to get recipes
   useGroceries: function(id, update){
       
       return axios.patch("/api/useGroceries" + id, update );
   },

   //create a route for making call to api - plugging in food items
   getRecipes: function(groceryItem){
       
       return axios.get("/api/recipes", {params: groceryItem});
   },
   // User API calls
   getCurrentUser: function(){
       
       return axios.get('/api/currentuser');
   },

   addNewUser: function(user){
       
       return axios.post("/api/signup", { user });
   },
   
   loginUser: function(user){
       
       return axios.post('/api/login', user);
   },
   
   grabUser: function(){
       
       return axios.get('/api/grab');
   },

   logout: function(currentUser){
       
       return axios.get('/api/logout', {params: currentUser} )
   }


};