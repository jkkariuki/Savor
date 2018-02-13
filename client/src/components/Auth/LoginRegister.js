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
            currentUserId: "",
            redirectTo: "",
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
              this.setState({
                username: "",
                password: "",
                email: "",
                loggedInUser: res.data,
                redirectTo: "/Main"                
                })
            self.someFn();
            self.sendCurrentUser()                
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
            this.setState({
                username: "",
                password: "",
                loggedInUser: res.data ,
                redirectTo: "/Main"         
              })
             self.someFn()
            }).catch(err => console.log("Save error:" + err)); 
            
    }

    someFn = () =>{
        
        const currentUser = this.state.loggedInUser;
        console.log("currentUser HERE:" + currentUser)
        this.props.updateLoggedInUser(currentUser)
    }

    
    
    
   

    

    


    render() {
        if (this.state.loggedInUser || this.state.currentUserId){
           
            return <Redirect to = {{ pathname: this.state.redirectTo}}/>;
        }
        else{

        return (
            <div>
                 
                <input type='checkbox' id='form-switch'/>

                <form id='login-form' action="" method='post' onSubmit = {this.handleLogIn}>
                    <h1 className="title">Savor</h1>
                    <input type="text" placeholder="Username"  required onChange = {this.handleInputChange}
                    name= "username" value = {this.state.username}/>
                    <input type="password" placeholder="Password" required onChange = {this.handleInputChange}
                    name = "password" value = {this.state.password}/>
                    <button type='submit'>Login</button>
                    <label htmlFor='form-switch'><span>Register</span></label>
                </form>

                <form id='register-form' action="/auth/signup" method='post' onSubmit = {this.handleFormSubmit}>
                    <input type="text" placeholder="Username" required onChange = {this.handleInputChange} name = "username"/>
                    <input type="email" placeholder="Email" required onChange = {this.handleInputChange} name="email" value = {this.state.email}/>
                    <input type="password" placeholder="Password" required onChange = {this.handleInputChange} name= "password" value = {this.state.password} />
                    <input type="password" placeholder="Re Password" required onChange = {this.handleInputChange} name= "confirmPass" value = {this.state.password}/>
                    <button type='submit'>Register</button>
                    <label htmlFor='form-switch'>Already Member ? Sign In Now..</label>
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