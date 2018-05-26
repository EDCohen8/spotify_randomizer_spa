import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";


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
        this.generateSong()
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
        }
        this.setState({
            currentlyDisplayed:  possibleGenres
        });
    }

    renderButtons() {
        return this.state.currentlyDisplayed.map((genre) => (
            <button onClick={() => this.onSubmit(genre)}>{genre}</button>
        ))
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Genre:
                        <input type='text' value={this.state.searchTerm} onChange={this.updateGenres}/>
                    </label>
                </form>
                {this.renderButtons()}
            </div>
        );
    }
}

export default GenreSelection;