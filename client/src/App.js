import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./sections/Main";
import Auth from "./components/Auth/LoginRegister";



  
  
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

    sendCurrentUser = () => {
        const currentUser = this.state.loggedInUser;
        return currentUser
    }

    

    render() {
        console.log("current user is" + this.state.loggedInUser)
        return (
            <Router>
              <div>
                {/* <Navbar /> */}

                <Switch>
                <Route exact path="/" render={() => {
                    return <Auth updateLoggedInUser ={this.updateLoggedInUser.bind(this)} />    
                }} />
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