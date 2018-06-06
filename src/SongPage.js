import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import GenreButton from './StyleComponents/GenreButton'
import GenreSearchBar from './StyleComponents/GenreSearchBar';
import * as global from './globals';

import {Grid,Jumbotron,Col} from "react-bootstrap"

const spotifyWeb = new Spotify();
const cookies = new Cookies();


spotifyWeb.setAccessToken(cookies.get("access_token"));

class SongPage extends Component {
    constructor() {
        super()
        this.state ={
            genres: global.genres.toString(),
            url: global.url.toString()
        }
        console.log(this.state.url)
    }


    render() {
        return (
            <div>
                <Grid>
                    <Col md={8}>
                        <Jumbotron>
                            <h1><strong> Song Page </strong></h1>
                            <hr className = "my-2"></hr>
                            <p> The following song was generated using the following genres: </p>
                            <p> {this.state.genres} </p>
                        </Jumbotron>
                    </Col>
                    <Col md= {4}>
                        <h2>Popularity: {global.popularity}</h2>
                        <p align="center"><iframe src ={this.state.url} width="300" height="380" frameBorder="0"  allow="encrypted-media" name ="spotify">' '</iframe></p>
                    </Col>
                </Grid>
            </div>
        )
    }

}
export default SongPage;