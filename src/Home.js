import React, { Component } from "react";
import Spotify from 'spotify-web-api-js';

const spotifyWeb = new Spotify();


class Home extends Component {

    constructor(){
        super();
        const params = this.getHashParams();
        console.log(params["/access_token"])
        console.log(params)
        this.state = {
            loggedIn: params["/access_token"] ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                image: ''
            },
            genres: {
                availableGenres: 'None'
            },
            tracks: '',
            seed_genres: 'classical',
            target_popularity: 0
        }

        if(this.state.loggedIn){
            console.log("Success")
            spotifyWeb.setAccessToken(params["/access_token"])
        }
        else{
            console.log("Failure")
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


    getNowPlaying(){
        spotifyWeb.getMyCurrentPlaybackState().then((response) =>
            this.setState({
                nowPlaying:{
                    name: response.item.name,
                    image: response.item.album.images[0].url
                }
            }))
        this.getSeeds()
        console.log(this.state.genres.availableGenres)
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


    // Test to make sure that it has every genre from
    // https://beta.developer.spotify.com/console/get-available-genre-seeds/
    getSeeds(){
        spotifyWeb.getAvailableGenreSeeds().then((response) =>
            this.setState({
                genres:{
                    availableGenres: response.genres
                }
            }))
    }

    getState(){
        return this.state
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
                <a href ='http://localhost:8888'>
                    <button>Login With Spotify</button>
                </a>


                <div>Now Playing: {this.state.nowPlaying.name}</div>
                <div>
                    <img src={this.state.nowPlaying.image} style={{width: 100}}/>
                </div>
                <button onClick={() => this.getNowPlaying()}>
                    Check Now Playing
                </button>
                <form>
                    <input
                        name ='seed_genres'
                        placeholder='Genre:' value={this.state.seed_genres}
                        onChange={e => this.change(e)}/>
                    <input
                        name ='target_popularity'
                        placeholder='Popularity:' value={this.state.target_popularity}
                        onChange={e => this.change(e)}/>
                </form>

                <button onClick={() => this.onSubmit()}>Enter</button>
            </div>
        );
    }
}

export default Home;