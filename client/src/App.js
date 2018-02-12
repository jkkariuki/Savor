
import React, { Component } from "react";
import BackgroundSlideShow from 'react-background-slideshow';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./sections/Main";
import Auth from "./components/Auth/LoginRegister";


import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
import image3 from './assets/3.jpg'

  
  
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
        console.log("current user is" + this.state.loggedInUser)
        
    };

    

    render() {
      
        return (
            <Router>
              <div>
                {/* <Navbar /> */}

                <Switch>
                <Route exact path="/" render={() => {
                        <div>
                          <BackgroundSlideShow images={[ image1, image2, image3 ]} />
                        </div>
                    return <Auth updateLoggedInUser ={this.updateLoggedInUser.bind(this)} />    
                }} />
                <Route exact path="/Main" render={() => {
                    return <Main getCurrentUser={this.state.loggedInUser} 
                    />    
                }}/>
                </Switch>
                </div>
            </Router>
        );
    }    

  }
  export default App;