import React, { Component } from "react";
import {Grid, Col, Button, Panel} from "react-bootstrap"
import SpotifyLoginButton from './StyleComponents/SpotifyLoginButton';

class Login extends Component {

    constructor(){
        super()
    }


    render() {
        return (
            <div>
                <Grid>
                    <Col md={7}>
                        <Panel bsStyle="success">
                            <Panel.Heading>
                                <a href ='http://localhost:8888'>
                                    <Button bsStyle="success"><SpotifyLoginButton>Login With Spotify</SpotifyLoginButton></Button>

                                </a>
                            </Panel.Heading>
                            <Panel.Body>
                                <p>Welcome to Spotify Random Song Generator! <br></br>
                                    Please click on the sign in button to sign into Spotify!<br></br>
                                    You will be taken to an external link where you can securely login into you Spotify account.<br></br></p>
                            </Panel.Body>
                        </Panel>
                    </Col>

                </Grid>
            </div>
        );
    }
}

export default Login;