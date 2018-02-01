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
        console.log(target.value);
        const name = target.name;
        console.log(target.name);

        this.setState({
          [name]: value
        });
      };

      handleFormSubmit = (event) => {
          event.preventDefault();
          API.saveUser({
              userInfo: {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
              }
          }).then(this.setState({
              username: "",
              password: "",
              email: "",
            })).catch(err => console.log("Save error:" + err))


      }

    render() {
        const { handleInputChange, handleFormSubmit } = this.props
        return (
            <div>
                 
                <input type='checkbox' id='form-switch'/>

                <form id='login-form' action="" method='post'>
                    <h1 className="title">Savor</h1>
                    <input type="text" placeholder="Username"  required onChange = {this.handleInputChange}
                    name= "username" value = {this.state.username}/>
                    <input type="password" placeholder="Password" required onChange = {this.handleInputChange}
                    name = "password" value = {this.state.password}/>
                    <button type='submit'>Login</button>
                    <label htmlFor='form-switch'><span>Register</span></label>
                </form>

                <form id='register-form' action="" method='post' onSubmit = {this.handleFormSubmit}>
                    <input type="text" placeholder="Username" required onChange = {handleInputChange} name = "username"/>
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
export default Auth;
Auth.props = {
    handleInputChange: PropTypes.func,
    handleFormSubmit: PropTypes.func
  }