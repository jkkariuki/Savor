import axios from "axios";

export default {
   // create a route for posting groceries to database
   saveUser: function (userObj){
       console.log("the users info is" + userObj);    
       return axios.post("/api/users", userObj);
   }
};
