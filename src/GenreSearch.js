import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import Autosuggest from 'react-autosuggest';
import {Grid, Button} from "react-bootstrap";

const spotifyWeb = new Spotify();

const getSuggestionValue = suggestion => suggestion.name;
const cookies = new Cookies();

spotifyWeb.setAccessToken(cookies.get("access_token"));

let spotifyGenres = [];

function getSeeds(){

    spotifyWeb.getAvailableGenreSeeds().then((response) => {
        return spotifyGenres = response.genres
    });
}

const getSuggestions = input => {
    if(spotifyGenres.length === 0){
        console.log("EMPTY LIST")
        getSeeds()
    }
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
            chosengenres: []
        }

    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        console.log( "value: " + newValue)
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
            console.log( "select: " + this.inputProps + method + suggestion.value);
            if (this.state.chosengenres.length === 5) {
                console.log("Already picked 5 genres")
            }
            else if (spotifyGenres.includes(suggestion.value)) {
                if (this.state.chosengenres.includes(suggestion.value)) {
                    console.log("THIS GENRE ALREADY BEEN CHOSEN")
                }
                else {
                    this.state.chosengenres.push(suggestion.value);
                    console.log(suggestion.value + " is added to the list")
                }

            }
            else {
                console.log("invalid genre")
            }
            console.log(" state Select " + this.state.chosengenres)
        }
    };

    getState(){
        return this.state();
    }
    render() {
        const { value, suggestions, chosengenres } = this.state;
        const inputProps = {
            placeholder: 'Type a genre',
            value,
            chosengenres,
            onChange: this.onChange
        };
        return (
            <div>
                <Grid>
                <h2 >GenreSearch</h2>
                <Button onClick={ () => console.log("but " +  value + " " + suggestions + " " + inputProps)}>
                </Button>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionHighlighted={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </Grid>
            </div>
        );
    }
}

export default GenreSearch;