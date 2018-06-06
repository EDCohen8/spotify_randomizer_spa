import React, { Component } from "react";
import {Grid, Col, Jumbotron, Button, Panel} from "react-bootstrap"
import SpotifyLoginButton from './StyleComponents/SpotifyLoginButton';

class Login extends Component {

    constructor(){
        super()
    }


    render() {
        return (
            <div>
                <Grid>
                    <Jumbotron>
                        <h1> <strong> Welcome to the Random Spotify Player </strong> </h1>
                        <hr className="my-2"></hr>
                        <p>Welcome to Spotify Random Song player! <br></br>
                                    Please click on the button below to login with Spotify!<br></br>
                                    You will be taken to an external link where you can securely login into your Spotify account.<br></br></p>
                                    <a href ='http://localhost:8888'><Button bsStyle="success"><SpotifyLoginButton>Login With Spotify</SpotifyLoginButton></Button></a>
                    </Jumbotron>
                    

                </Grid>
            </div>
        );
    }
}

export default Login;