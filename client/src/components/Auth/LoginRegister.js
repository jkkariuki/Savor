import React from "react";
import PropTypes from 'prop-types';
import API from "../../utils/API";
import "./LoginRegister.css";
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPasword: "",
            email: ""
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value
        const name = target.name;

        this.setState({
          [name]: value
        });
      };

      handleFormSubmit = (event) => {
        event.preventDefault()
		// TODO - validate!
		axios.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/'
					})
				} else {
					console.log('duplicate')
				}
			})
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
                    <input type="password" placeholder="Confirm Password" required onChange = {this.handleInputChange} name= "confirmPass" value = {this.state.confirmPassword}/>
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