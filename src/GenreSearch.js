import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import Autosuggest from 'react-autosuggest';

const spotifyWeb = new Spotify();

const getSuggestionValue = suggestion => suggestion.name;
const cookies = new Cookies();

spotifyWeb.setAccessToken(cookies.get("access_token"));

let spotifyGenres = [];

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
};

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.valueOf()}</span>
    );
}


class GenreSearch extends Component {

    constructor(){
        super();

        this.state = {
            genres: {
                availableGenres: ''
            },
            value: '',
            suggestions: [],
            chosenGenres: []
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

    onSuggestionSelected = ({ suggestion, method}) => {
        if(method === 'click' || method === 'enter') {
            console.log(suggestion.valueOf());
            if (spotifyGenres.length === 5) {
                console.log("Already picked 5 genres")
            }
            else if (spotifyGenres.includes(suggestion.valueOf())) {
                if (this.state.chosenGenres.includes(suggestion.valueOf())) {
                    console.log("THIS GENRE ALREADY BEEN CHOSEN")
                }
                else {
                    this.state.chosenGenres.push(suggestion.valueOf());
                    console.log(suggestion.valueOf() + " is added to the list")
                }

            }
            else {
                console.log("invalid genre")
            }
            console.log(this.state.chosenGenres)
        }
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
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionHighlighted={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
            </div>
        );
    }
}

export default GenreSearch;