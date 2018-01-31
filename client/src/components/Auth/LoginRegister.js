import React from "react";
import PropTypes from 'prop-types';
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

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        });
      };

    render() {
        const { handleInputChange, handleFormSubmit } = this.props
        return (
            <div>
                 
                <input type='checkbox' id='form-switch'/>
                <form id='login-form' action="" method='post'>
                    <h1 className="title">Savor</h1>
                    <input type="text" placeholder="Username" required onChange = {handleInputChange}
                    name= "username" value = {this.state.username}/>
                    <input type="password" placeholder="Password" required onChange = {handleInputChange}
                    name = "password" value = {this.state.password}/>
                    <button type='submit'>Login</button>
                    <label for='form-switch'><span>Register</span></label>
                </form>
                <form id='register-form' action="" method='post'>
                    <input type="text" placeholder="Username" required onChange = {handleInputChange} name = "reg-username"/>
                    <input type="email" placeholder="Email" required onChange = {handleInputChange} name="reg-email" value = {this.state.email}/>
                    <input type="password" placeholder="Password" required onChange = {handleInputChange} name= "reg-password" value = {this.state.password} />
                    <input type="password" placeholder="Re Password" required onChange = {handleInputChange} value = {this.state.password}/>
                    <button type='submit'>Register</button>
                    <label for='form-switch'>Already Member ? Sign In Now..</label>
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