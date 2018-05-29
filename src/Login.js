import React, { Component } from "react";
import {Button, Grid} from "react-bootstrap"
import SpotifyLoginButton from './StyleComponents/SpotifyLoginButton';

class Login extends Component {

    constructor(){
        super()
    }


    render() {
        return (
            <div>
                <Grid>
                    <a href ='http://localhost:8888'>
                        <SpotifyLoginButton>Login With Spotify</SpotifyLoginButton>
                    </a>
                </Grid>
            </div>
        );
    }
}

export default Login;