import React from "react";
import PropTypes from 'prop-types';
import API from "../../utils/API";
import Main from "../../sections/Main.js"
import { Redirect } from "react-router-dom"
import "./LoginRegister.css"



class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            loggedInUser: "",
            redirectTo: "",
            isLoggedIn: false,
        };
    }

    handleInputChange = (event) => {
        console.log(event);
        const target = event.target;
        console.log(event.target);
        const value = target.value
        const name = target.name;
        this.state.username
        this.setState({
          [name]: value
        });
      };

      //this function is passing new user data to a post route in the api page
      handleFormSubmit = (event) => {
        const self = this;
        
          event.preventDefault();
          API.addNewUser({              
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
              }
          ).then(res => {
              console.log("userID : " + res.data)
              const currentUser = res.data
              this.setState({
                username: "",
                password: "",
                email: ""               
                })
            
                          
            // self.someFn();
          })
            .catch(err => console.log("Save error:" + err));           
    }

    handleLogIn = (event) => {
        const self = this
        console.log("hello")
        event.preventDefault();
        API.loginUser({              
              username: this.state.username,
              password: this.state.password
            }
        ).then(res => {
            console.log(res)
            console.log("user is " + res.data);

            if(res.data){

                this.setState({
                    username: "",
                    password: "",
                    loggedInUser: res.data ,
                    redirectTo: "/Main",
                    isLoggedIn: true         
                  })
            }             
              
              this.someFn(this.state.isLoggedIn)
            }).catch(err => console.log("Save error:" + err));             
    }

   

    someFn = (data) =>{
        
        const isLoggedIn = data;
        console.log("currentUser HERE:" + isLoggedIn)
        this.props.updateLoggedInUser(isLoggedIn)
    }

    
    
    
   

    

    


    render() {
        if (this.state.loggedInUser){
           
            return <Redirect to = {{ pathname: this.state.redirectTo}}/>;
        }
        else{

        return (
            <div id="loginContainer">

                <img className="logoImage2" src={require("../../images/Logo2.png")} />
                 
                <input type='checkbox' id='form-switch'/>

                <form className= "form-group" id='login-form' action="" method='post' onSubmit = {this.handleLogIn}>
                    <input className="loginInput" type="text" placeholder="Username"  required onChange = {this.handleInputChange}
                    name= "username" value = {this.state.username}/>
                    <input className="loginInput" type="password" placeholder="Password" required onChange = {this.handleInputChange}
                    name = "password" value = {this.state.password}/>
                    <button className="loginButton" type='submit'>Login</button>
                    <br/>
                    <label className="RegisterButton" htmlFor='form-switch'><span>Register</span></label>
                </form>
        

                <form id='register-form' action="/auth/signup" method='post' onSubmit = {this.handleFormSubmit}>
                    <input className="registerInput" type="text" placeholder="Username" required onChange = {this.handleInputChange} name = "username"/>
                    <br/>
                    <input className="registerInput" type="email" placeholder="Email" required onChange = {this.handleInputChange} name="email" value = {this.state.email}/>
                    <br/>
                    <input className="registerInput" type="password" placeholder="Password" required onChange = {this.handleInputChange} name= "password" value = {this.state.password} />
                    <br/>
                    <input className="registerInput" type="password" placeholder="Re Password" required onChange = {this.handleInputChange} name= "confirmPass" value = {this.state.password}/>
                    <br/>
                    <button className="loginButton" type='submit'>Register</button>
                    <br/>
                    <label className="returnToLogin" htmlFor='form-switch'>Already A Member ? Sign In Now..</label>
                </form >
            </div>
        )
    }
    }
}
export default Auth;
Auth.props = {
    handleInputChange: PropTypes.func,
    handleFormSubmit: PropTypes.func,
    someFn: PropTypes.func

  }