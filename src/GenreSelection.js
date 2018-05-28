import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import GenreButton from './StyleComponents/GenreButton'
import GenreSearchBar from './StyleComponents/GenreSearchBar'
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



    onSubmit(genre){
        console.log(genre + " has been pressed");
        if(this.state.genres.length < 5 && !genreSet.has(genre)) {
            this.state.genres.push(genre);
            genreSet.add(genre)
        }
        else{
            console.log("Max number of genres chosen")
        }
        console.log(this.state.genres)

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