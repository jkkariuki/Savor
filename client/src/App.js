
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./sections/Main";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedInUser: null,
    }
  }

    updateLoggedInUser(currentUser) {
        this.setState({
            loggedInUser: currentUser
        });
        console.log(this.state.loggedInUser)
        
    };

    

    render() {
        console.log("current user is" + this.state.loggedInUser)
        return (
            <Router>
              <div>
                {/* <Navbar /> */}
                <Switch>
                <Route exact path="/" render={() => {
                    return <Login updateLoggedInUser ={this.updateLoggedInUser.bind(this)}
                     />   
                }}/>
                <Route exact path='/Register' render={()=> {
                    return <Register 
                    />
                }}/>
                <Route exact path="/Main" render={() => {
                    return <Main/>    

                }}/>
                </Switch>
                </div>
            </Router>

           
  
        );
    }    

  }
  export default App;