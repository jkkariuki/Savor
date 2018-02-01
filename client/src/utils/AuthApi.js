import axios from "axios";

export default {
   // create a route for posting groceries to database
   saveUser: function (userInfo){
       console.log("the users info is" + userInfo);
       
       return axios.post("/api/users", userInfo);
   }
};
