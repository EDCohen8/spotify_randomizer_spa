import React, { Component } from "react";
import Spotify from 'spotify-web-api-js';
import Cookies from 'universal-cookie';

const spotifyWeb = new Spotify();


class Home extends Component {

    constructor(){
        super();
        const cookies = new Cookies();
        let auth_token = cookies.get("access_token");
        spotifyWeb.setAccessToken(auth_token);
        console.log(auth_token)
        this.state = {
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