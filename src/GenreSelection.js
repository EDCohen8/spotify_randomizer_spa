import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";


const spotifyWeb = new Spotify();
const cookies = new Cookies();

spotifyWeb.setAccessToken(cookies.get("access_token"));

class GenreSelection extends Component {
    constructor() {
        super()
        this.state = {
            spotifyGenres: [],
            searchTerm: '',
            currentlyDisplayed: []
        }
        this.getSeeds()
        this.updateGenres = this.updateGenres.bind(this);
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
        return genre
    }

    updateGenres(event) {
        this.setState({searchTerm: event.target.value}, ()=> {this.filterGenres()})
    }

    filterGenres() {
        let inputLower = this.state.searchTerm.toLowerCase();
        let inputLength = inputLower.length;
        let possibleGenres = [];
        if (inputLength > 0) {
            possibleGenres = this.state.spotifyGenres.filter(
                gen => gen.slice(0, inputLength).toLowerCase() === inputLower)
        }
        this.state.currentlyDisplayed = possibleGenres
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