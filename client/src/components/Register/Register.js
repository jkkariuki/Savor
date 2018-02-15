import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import API from "../../utils/API";
import BackgroundSlideshow from 'react-background-slideshow';
import "./Register.css";
import { Button, Modal, FormGroup, FormControl, ControlLabel, ButtonToolbar } from 'react-bootstrap';

import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
import image3 from './assets/3.jpg'
import Logo from './assets/Logo.png'

const images = [
    image1,
    image2,
    image3
]
class Register extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",
            loggedInUser: "",
            redirectTo: "",
            show: true,
            backdrop: true,
            value: ''

        };
    }

    handleHide = (event) => {
        this.setState({ 
        show: true,
        backdrop: true });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
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
                password2: this.state.password2,
                email: this.state.email
              }
          ).then(res => {
              console.log('userID : ' + res.data)
                this.setState({
                username: "",
                password: "",
                email: "",
                loggedInUser: res.data,
                redirectTo: "/"
                })

                localStorage.setItem('currentUser', res.data);
              
            }).catch(err => console.log("Save error:" + err));           
    }

    someFn = () =>{
        
        const currentUser = this.state.loggedInUser;
        console.log("currentUser HERE:" + currentUser)
        this.props.updateLoggedInUser(currentUser)
    }

    getValidationState() {
        const passLength = this.state.password.length;
        const email = this.state.password.length;
        if (passLength > 10) return 'success';
        else if (passLength > 5) return 'warning';
        else if (passLength > 0) return 'error';
        return null;
      }
    
    render() {
        if (this.state.redirectTo) {
            return <Redirect to ={{pathname: this.state.redirectTo }} />
        }else{

        return (
            <div>
                <BackgroundSlideshow images = {images} />
                
                <div className='logoContainer'>
                <img className='logo img-fluid center-block' src={[Logo]}/>
                </div>

                <div className='modal-container'>

                <Modal
                    backdrop={this.state.backdrop}
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    dialogClassName='registration-modal'
                >
                <Modal.Body>
                <form id='register-form' action="/auth/signup" method='post' onSubmit = {this.handleFormSubmit}>

                <FormGroup
                    controlId='formBasicText'
                    validationState={this.getValidationState()}
                >
                <ControlLabel>Username</ControlLabel>
               
                <FormControl
                    type='text'
                    value={this.state.username}
                    placeholder='Username'
                    name='username'
                    onChange={this.handleInputChange}
                />

                <ControlLabel>Email</ControlLabel>

                <FormControl
                    type='email'
                    value={this.state.email}
                    placeholder='Email'
                    name='email'
                    onChange={this.handleInputChange}
                />

                <ControlLabel>Password</ControlLabel>
               
                <FormControl
                    type='password'
                    value={this.state.password}
                    placeholder='Password'
                    name='password'
                    onChange={this.handleInputChange}
                />
                <ControlLabel>Confirm Password</ControlLabel>
               
                <FormControl
                    type='password'
                    value={this.state.password}
                    placeholder='Confirm Password'
                    name='password2'
                    onChange={this.handleInputChange}
                />

                <FormControl.Feedback />
                </ FormGroup>
                <div>
                <ButtonToolbar>
                    <Button
                    bsStyle='primary' 
                    bsSize='large' 
                    type="submit">
                    Submit
                    </Button>
                </ButtonToolbar>
                </div>
                </form>
                </Modal.Body>
                </Modal>
                </div>
            </div>
                       /* <form id='register-form' action="/auth/signup" method='post' onSubmit = {this.handleFormSubmit}>
                    <input type="text" placeholder="Username" required onChange = {this.handleInputChange} name = "username"/>
                    <input type="email" placeholder="Email" required onChange = {this.handleInputChange} name="email" value = {this.state.email}/>
                    <input type="password" placeholder="Password" required onChange = {this.handleInputChange} name= "password" value = {this.state.password} />
                    <input type="password" placeholder="Re Password" required onChange = {this.handleInputChange} name= "confirmPass" value = {this.state.password}/>
                    <Button bsStyle='primary' bsSize='large' type='submit'>Submit</Button>
                </ form> */
        )

    }}
    
}


export default Register
Register.props = {
    handleInputChange: PropTypes.func,
    handleFormSubmit: PropTypes.func,
    someFn: PropTypes.func,

  }