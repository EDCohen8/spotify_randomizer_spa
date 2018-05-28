import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import GenreButton from './StyleComponents/GenreButton'
import GenreSearchBar from './StyleComponents/GenreSearchBar';
import * as global from './globals';

import {Grid} from "react-bootstrap"

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
                    <iframe src ={this.state.url} width="300" height="380" frameBorder="0"  allow="encrypted-media" name ="spotify">''</iframe>
                </Grid>
            </div>
        )
    }

}
export default SongPage;