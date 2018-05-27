import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import GenreButton from './StyleComponents/GenreButton'
import GenreSearchBar from './StyleComponents/GenreSearchBar'
import GenreSelction from './GenreSelection'

const spotifyWeb = new Spotify();
const cookies = new Cookies();
const genreSelection = new GenreSelction();


spotifyWeb.setAccessToken(cookies.get("access_token"));

class SongPage extends Component {
    constructor() {
        super()
        this.state = genreSelection.getState();

    }

    generateSong(){
        spotifyWeb.getRecommendations(({
            limit: 1,
            seed_genres: this.state.genres.toString(),
            target_popularity: this.state.target_popularity
        })).then((response) =>
            this.setState({
                tracks: response.tracks
            }))

        console.log(this.state.tracks)
    }
    getSongUrl(){
        var track = JSON.stringify(this.state.tracks);
        var index = track.search("https://open.spotify.com/artist/")
        var url = track[index];
        return url;
    }

    render() {
        return (
            <div>
                <iframe src="https://open.spotify.com/" onload="this.src = this.getSongUrl();" width="300" height="380"
                        frameBorder="0" allowTransparency="true" allow="encrypted-media" id="spotify">''</iframe>
                <script>
                    window.onload = function() {
                  //  document.getElementById('spotify').src = this.getSongUrl()
                }
                    </script>
            </div>
        )
    }

}
export default SongPage;