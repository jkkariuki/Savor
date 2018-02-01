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

<<<<<<< HEAD
    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
=======
    handleInputChange = (event) => {
        console.log(event);
        const target = event.target;
        console.log(event.target);
        const value = target.value
        console.log(target.value);
        const name = target.name;
        console.log(target.name);

>>>>>>> 8a53aefb7bd2103a9472836c1327b76c461b74a1
        this.setState({
          [name]: value
        });
      };

<<<<<<< HEAD
=======
      handleFromSubmit = (event) => {
          event.preventDefault();
      }

>>>>>>> 8a53aefb7bd2103a9472836c1327b76c461b74a1
    render() {
        const { handleInputChange, handleFormSubmit } = this.props
        return (
            <div>
                 
                <input type='checkbox' id='form-switch'/>
<<<<<<< HEAD
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
=======

                <form id='login-form' action="" method='post'>
                    <h1 className="title">Savor</h1>
                    <input type="text" placeholder="Username" value = {this.setState.username} required onChange = {this.handleInputChange}
                    name= "username" value = {this.state.username}/>
                    <input type="password" placeholder="Password" required onChange = {this.handleInputChange}
                    name = "password" value = {this.setState.password}/>
                    <button type='submit'>Login</button>
                    <label for='form-switch'><span>Register</span></label>
                </form>

                <form id='register-form' action="" method='post'>
                    <input type="text" placeholder="Username" required onChange = {handleInputChange} name = "reg-username"/>
                    <input type="email" placeholder="Email" required onChange = {this.handleInputChange} name="reg-email" value = {this.setState.email}/>
                    <input type="password" placeholder="Password" required onChange = {this.handleInputChange} name= "reg-password" value = {this.setState.password} />
                    <input type="password" placeholder="Re Password" required onChange = {this.handleInputChange} value = {this.setState.password}/>
>>>>>>> 8a53aefb7bd2103a9472836c1327b76c461b74a1
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