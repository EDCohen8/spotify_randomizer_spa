import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import Autosuggest from 'react-autosuggest';

const spotifyWeb = new Spotify();

const getSuggestionValue = suggestion => suggestion.name;
const cookies = new Cookies();

spotifyWeb.setAccessToken(cookies.get("access_token"));

var spotifyGenres = []

function getSeeds(){

    spotifyWeb.getAvailableGenreSeeds().then((response) => {
        return spotifyGenres = response.genres
    });
    return spotifyGenres;
}

spotifyGenres = getSeeds();

const getSuggestions = input => {
    if(spotifyGenres === undefined || spotifyGenres === null) {
        console.log("LIST OF GENRES IS UNDEFINED");
        return -1
    }

    else{
        let inputLower = input.toLowerCase();
        let inputLength = inputLower.length;
        let possibleGenres = [];
        if (inputLength > 0) {
            possibleGenres = spotifyGenres.filter(
                gen => gen.slice(0, inputLength).toLowerCase() === inputLower)
        }
        console.log(possibleGenres);
        return possibleGenres
    }
}

const renderSuggestion = suggestion => (
    <div>
        {suggestion.valueOf()}
    </div>
);

class GenreSearch extends Component {

    constructor(){
        super()

        this.state = {
            genres: {
                availableGenres: ''
            },
            value: '',
            suggestions: []
        }

    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Type a genre',
            value,
            onChange: this.onChange
        };
        return (
            <div>
                <h2>GenreSearch</h2>
                <button onClick={() => this.getSeeds()}>
                    Get Available Seeds
                </button>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
            </div>
        );
    }
}

export default GenreSearch;