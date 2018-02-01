import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./sections/Main";
<<<<<<< HEAD
import Auth from "./components/Auth/LoginRegister"
=======
import Auth from "./components/Auth/LoginRegister";
>>>>>>> 8a53aefb7bd2103a9472836c1327b76c461b74a1


const App = () => (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Route exact path="/" component={Auth} />
      </div>
    </Router>
  )
  
  
  
  export default App;