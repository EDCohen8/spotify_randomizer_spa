import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import GenreButton from './StyleComponents/GenreButton'
import GenreSearchBar from './StyleComponents/GenreSearchBar';
import * as global from './globals';
import {Grid, Col, Button} from "react-bootstrap"

const spotifyWeb = new Spotify();
const cookies = new Cookies();
const genreSet = new Set();

spotifyWeb.setAccessToken(cookies.get("access_token"));

class GenreSelection extends Component {
    constructor() {
        super()

        this.state = {
            spotifyGenres: [],
            searchTerm: '',
            currentlyDisplayed: [],
            genres: [],
            target_popularity: 0,
            tracks: '',
            artist: ''
        }
        this.getSeeds()
        this.updateGenres = this.updateGenres.bind(this);
    }



    getState(){
        return this.state;
    }

//test
    getSeeds(){
        spotifyWeb.getAvailableGenreSeeds().then((response) => {
            let temp = response.genres
            this.setState({
                spotifyGenres : temp,
                currentlyDisplayed: temp
            })
            return this.state.spotifyGenres
        });
    }

    getSongUrl(){
        var track = JSON.stringify(this.state.tracks);
        var id = "https://open.spotify.com/track/"
        var index = track.search(id)
        var url = ""
        var i = id.length
        while(i !== 53){
            url += track[index+i++]

        }
        console.log(track)
        console.log(index)
        console.log("url " + url)
        console.log(this.state.tracks)
        this.setState({
            url: "https://open.spotify.com/embed/track/" + url.toString()
        })
        global.addTrack(this.state.url)
        return url;
    }

    getArtist(){
        var song =JSON.stringify(this.state.tracks);
        var temp = "https://open.spotify.com/artist/";
        var index = song.search(temp);
        var i =  temp.length;
        var id = '';
        while(i < temp.length + 22){
             id += song[index + i++]
        }
        console.log("id " + id)
        global.addArtist(id)
        spotifyWeb.getArtistRelatedArtists(id).then((response) =>
            this.setState({
                artist: response.artists
            }));

        console.log(this.state.artist)
        return id;

    }
    generateSong(){
        spotifyWeb.getRecommendations(({
            limit: 1,
            market: 'US',
            seed_genres: this.state.genres.toString(),
            target_popularity: this.state.target_popularity
        })).then((response) =>
            this.setState({
                tracks: response.tracks
            }))

        console.log(this.state.tracks)
    }


    onSubmit(genre){
        console.log(genre + " has been pressed");
        if(this.state.genres.length < 5 && !genreSet.has(genre)) {
            this.state.genres.push(genre);
            genreSet.add(genre)
            global.addGenre(genre)
        }
        else{
            console.log("Max number of genres chosen")
        }
        console.log(this.state.genres)
        this.generateSong()
        this.getSongUrl()
        this.getArtist()
        return genre
    }

    updateGenres(event) {
        this.setState({searchTerm: event.target.value}, ()=> {this.filterGenres()})
        console.log(this.state)
    }

    filterGenres() {
        let inputLower = this.state.searchTerm.toLowerCase();
        let inputLength = inputLower.length;
        let possibleGenres = [];
        if (inputLength > 0) {
            possibleGenres = this.state.spotifyGenres.filter(
                gen => gen.slice(0, inputLength).toLowerCase() === inputLower)
            this.setState({
                currentlyDisplayed:  possibleGenres
            });
        }
        else{
            this.setState({currentlyDisplayed: this.state.spotifyGenres})
        }

    }

    renderButtons() {
        return this.state.currentlyDisplayed.map((genre) => (
            <GenreButton key={genre} onClick={() => this.onSubmit(genre)}>{genre}</GenreButton>
        ))
    }

    render() {
        return (
            <div>
                <Grid>
                <br></br>
                <br></br>
                <Col md={5}>
                <p>On Click of a button, it will take you to another page of just
                    the album cover, and the buttons next song, pause, add to playlist,
                    and choose another genre (it will take you back to the genre page)</p>
                </Col>
                    <a href="http://localhost:3000/#/songPage">Generate Song</a>
                <Col md={5}>
                <form>
                    <GenreSearchBar>
                    Search for a genre or click a button below
                    <div class="input-group">
                        <input class= "form-control" type='text' value={this.state.searchTerm} onChange={this.updateGenres}/>
                        <span class="input-group-btn">
                        <Button class = "btn btn-default" bsStyle = "success">Reset </Button>
                        </span>
                    
                    </div>
                    </GenreSearchBar>
                
                    
                </form>
                </Col>
                {this.renderButtons()}
                </Grid>
            </div>
        );
    }
}

export default GenreSelection;