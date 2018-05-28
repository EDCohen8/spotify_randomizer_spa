import React, { Component } from "react";
import Spotify from 'spotify-web-api-js';
import Cookies from 'universal-cookie';
import {Grid, Col, Button} from "react-bootstrap";
const spotifyWeb = new Spotify();


class Home extends Component {

    constructor(){
        super();
        const params = this.getHashParams();

        this.state = {
            loggedIn: params["/access_token"] ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                image: ''
            },

            tracks: '',
            seed_genres: 'classical',
            target_popularity: 0,
            genres: {
                availableGenres: ''
            },
        }

        if(this.state.loggedIn){
            let auth_token = params["/access_token"]
            console.log("Success")
            console.log("Creating Cookies")
            // get cookies with cookies.get("access_token")
            const cookies = new Cookies()
            cookies.set("access_token", auth_token, { path: '/' })
            spotifyWeb.setAccessToken(cookies.get("access_token"))
        }

    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    getState(){
        return this.state;
    }


    getNowPlaying(){
        spotifyWeb.getMyCurrentPlaybackState().then((response) =>
            this.setState({
                nowPlaying:{
                    name: response.item.name,
                    image: response.item.album.images[0].url
                }
            }))
    }

    generateSong(){
        spotifyWeb.getRecommendations(({
            limit: 1,
            seed_genres: this.state.seed_genres,
            target_popularity: this.state.target_popularity
        })).then((response) =>
            this.setState({
                tracks: response.tracks
            }))
    }

    change = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };
    onSubmit =() => {
        this.generateSong()
        console.log(this.state.tracks)
    };

    render() {
        return (
            <div className="App">
                <Grid>
                    <Col md={3} >
                    <a href ='http://localhost:8888'>
                        <Button bsStyle="primary">Login With Spotify</Button>
                    </a>
                    </Col>
                    <Col md={3}>
                    <div>Now Playing: {this.state.nowPlaying.name}</div>
                    <div>
                        <img src={this.state.nowPlaying.image} style={{width: 100}}/>
                    </div>
                    
                    <Button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </Button>
                    </Col>
                    <Col md ={2}>
                    <div class = "text-center">
                <form>
                    <input class="form-control"
                        name ='seed_genres'
                        placeholder='Genre:' value={this.state.seed_genres}
                        onChange={e => this.change(e)}/>
                    <input class="form-control"
                        name ='target_popularity'
                        placeholder='Popularity:' value={this.state.target_popularity}
                        onChange={e => this.change(e)}/>
                </form>
                <br></br>
                <Button bsStyle= "success"  class= "text-center" onClick={() => this.onSubmit()}>Enter</Button> </div>
                </Col>
                </Grid>
            </div>
        );
    }
}

export default Home;