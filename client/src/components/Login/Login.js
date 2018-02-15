import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import API from "../../utils/API";
import BackgroundSlideshow from 'react-background-slideshow';
import { Button, Modal, FormGroup, FormControl, ControlLabel, ButtonToolbar } from 'react-bootstrap';
import "./Login.css";

import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
import image3 from './assets/3.jpg'
import Logo from './assets/Logo.png'

const images = [
    image1,
    image2,
    image3
]
class Login extends React.Component {
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

        };
    }

    handleHide = (event) => {
        this.setState({ 
        show: true,});
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value
        const name = target.name;
        this.state.username
        this.setState({
          [name]: value
        });
      };

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
              localStorage.setItem('currentUser', res.data);

            //  self.someFn()
            }).catch(err => console.log("Save error:" + err));
            
    }

    someFn = () =>{
        
        const currentUser = this.state.loggedInUser;
        console.log("currentUser HERE:" + currentUser)
        this.props.updateLoggedInUser(currentUser)
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
                    dialogClassName="login-modal"
                >
                <Modal.Body>
                <form id='login-form' action="" method='post' onSubmit = {this.handleLogIn}
                >

                <FormGroup
                    controlId='formBasicText'
                >
                <ControlLabel>Username</ControlLabel>
                <FormControl
                    type='text'
                    value={this.state.username}
                    placeholder='Username'
                    name='username'
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
                
                <FormControl.Feedback />
                </ FormGroup>
                <div>
                <ButtonToolbar>
                <Button
                    bsStyle='primary' 
                    bsSize='large'
                    type='submit'>
                    Login
                    </Button>
                    <Button
                    href='/Register'
                    bsStyle='primary' 
                    bsSize='large' 
                    type="">
                    Register
                    </Button>
                </ButtonToolbar>
                </div>
                    </form>
                </Modal.Body>
                </Modal>
                </div>
            </div>
       
        )

    }}
    
}
export default Login
Login.props = {
    handleInputChange: PropTypes.func,
    someFn: PropTypes.func,

  }