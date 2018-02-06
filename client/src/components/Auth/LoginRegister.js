import React from "react";
import PropTypes from 'prop-types';
import API from "../../utils/API"
import "./LoginRegister.css"



class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        };
    }

    handleInputChange = (event) => {
        console.log(event);
        const target = event.target;
        console.log(event.target);
        const value = target.value
        const name = target.name;
        console.log(this.state.username)
        this.setState({
          [name]: value
        });
      };

      handleFormSubmit = (event) => {
          event.preventDefault();
          API.addNewUser({              
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
              }
          ).then(this.setState({
            //   username: "",
            //   password: "",
            //   email: "",
            }))
            .catch(err => console.log("Save error:" + err));           
    }

    handleLogIn = (event) => {
        event.preventDefault();
        API.loginUser({              
              username: this.state.username,
              password: this.state.password,
            }
        ).then(this.setState({
            username: "",
            password: "",
          }))
          .catch(err => console.log("Save error:" + err));           
  }

    

    render() {
        
        return (
            <div>
                 

                <form id='login-form' action="" method='post' onSubmit = {this.handleFormSubmit}>
                    <h1 className="title">Savor</h1>
                    <input type="text" placeholder="Username"   onChange = {this.handleInputChange}
                    name= "username" value = {this.state.username}/>
                    <input type="password" placeholder="Password"  onChange = {this.handleInputChange}
                    name = "password" value = {this.state.password}/>
                    <input type="email" placeholder="Email"  onChange = {this.handleInputChange} name="email" value = {this.state.email}/>
                    <button type='submit'>Register</button>
                </form>

                
            </div>
        )
    }
}
export default Auth;
Auth.props = {
    handleInputChange: PropTypes.func,
    handleFormSubmit: PropTypes.func
  }