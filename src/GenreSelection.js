import React, { Component } from "react";
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import GenreButton from './StyleComponents/GenreButton'
import GenreSearchBar from './StyleComponents/GenreSearchBar';
import * as global from './globals';
import {Grid, Col, Button, Panel, Jumbotron} from "react-bootstrap"

const spotifyWeb = new Spotify();
const cookies = new Cookies();
const genreSet = new Set();

//All Api calls are made in this component. The other components display the data


class GenreSelection extends Component {
    constructor() {
        super()
        const params = this.getHashParams();
        console.log(cookies);

        console.log(" params: " + params["/genreSelection/access_token"]);
        if(typeof params["/genreSelection/access_token"] != "undefined"){
            let auth_token = params["/genreSelection/access_token"];
            cookies.set("access_token", auth_token, {path: '/'});
            spotifyWeb.setAccessToken(auth_token);
        }
        else {
            spotifyWeb.setAccessToken(cookies.get("access_token"));
        }
        this.state = {
            spotifyGenres: [],
            searchTerm: '',
            currentlyDisplayed: [],
            genres: [],
            target_popularity: 0,
            tracks: '',
            artist: '',
            artists: {},
            artistNames: [],
            popularity: []
        }

        this.getSeeds();
        this.updateGenres = this.updateGenres.bind(this);
        this.generateSong = this.generateSong.bind(this);
        this.getArtist = this.getArtist.bind(this);
        this.setName = this.setName.bind(this);
        this.resetButton = this.resetButton.bind(this);
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

    //parsing the artists from getArt and getting the artist names and IDs
    setName(){
        var art = [];
        var pop = [];
        var ids = [];
        for (var i = 0, emp; i < 5; i++) {
            emp = this.state.artists[i];
            art.push(emp.name);
            pop.push(emp.popularity);
            ids.push("https://open.spotify.com/artist/" + emp.id);
        }
        this.setState({
            artistNames: art,
            popularity: pop
        }, () => {console.log(this.state.artistNames)});
        console.log("this state" + this.state)
        global.addArt(art);
        global.addPop(pop);
        global.addArtists(ids);
        console.log("ids" + ids)
    }

    getState(){
        return this.state;
    }

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

    //getting the id of the artist and setting the url
    //then generating similar artists

    getArtist(){
        console.log(JSON.stringify(this.state.tracks))
        var artists = {}
        var id ='';
        var artistID =''
        var artistID = {}
        for (var i = 0, emp; i < this.state.tracks.length; i++) {
            emp = this.state.tracks[i];
            artists[ emp.id] = emp.id;
            id = artists[emp.id];
            artists[emp.name] = emp.artists;
            artistID = emp.artists[0].id;
            global.setName(emp.artists[0].name);
            global.setPopularity(emp.popularity);
            console.log("name: " + JSON.stringify(emp.artists))
        }

        console.log("id " + id);
        global.addArtist(artistID);
        var url = "https://open.spotify.com/embed/track/" + id;
        global.addTrack(url)
        this.setState({
            url: url
        }, () =>
        spotifyWeb.getArtistRelatedArtists(artistID).then((response) =>
            this.setState({
                artists: response.artists.slice(0,5)
            }, () => {this.setName()})));


        console.log(this.state.artists)


        console.log(this.state.artistNames);
        console.log('g '+ global.artist);

        return id;

    }


    generateSong(){
        var num = Math.floor((Math.random() * 40));
        console.log("number: " + num)
        spotifyWeb.getRecommendations(({
            limit: 1,
            market: 'US',
            seed_genres: this.state.genres.toString(),
            target_popularity: num
        })).then((response) =>
            this.setState({
                tracks: response.tracks
            }, () => {this.getArtist()}));


        console.log("artist ; " + JSON.stringify(this.state.tracks))
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
        this.generateSong();
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
            this.setState({searchTerm: "",
                currentlyDisplayed: this.state.spotifyGenres})
        }

    }

    renderButtons() {
        return this.state.currentlyDisplayed.map((genre) => (
            <GenreButton key={genre} onClick={() => this.onSubmit(genre)}>{genre}</GenreButton>
        ))
    }
    maxNum(){
        if(this.state.genres.length == 5){
            return 'MAX NUMBER OF GENRES SELECTED'
        }
    }

    resetButton() {
        this.setState({searchTerm: "",
            currentlyDisplayed: this.state.spotifyGenres,
            genres: []})
        global.resetGenres()
        genreSet.clear()
    }

    displayGenres() {
        var a = ""
        var i = 0;
        for (i = 0; i < global.genres.length; i++) {
         a += global.genres[i] + " "
        }
        return a
    }

    render() {
        return (
            <div>
                <Grid>
                <br></br>
                <br></br>
                <Col md={7}>
                <Panel bsStyle="success">
                    <Panel.Heading>
                        <h2 className="text-center"><strong> Genre Selection </strong></h2>
                    </Panel.Heading>   
                    <Panel.Body>             
                        <p>Welcome to the genre selection page of the Spotify song picker! <br></br>
                        Below are a list of the many genres that are available for our generator.<br></br><br></br>
                            Select up to 5 genres!<br></br>
                            Selected genres: {this.displayGenres()}<br></br>
                            {this.maxNum()}</p>
                    </Panel.Body>
                </Panel>
                </Col>
                    
                <Col md={5}>
                    <Jumbotron>
                        <form>
                            <GenreSearchBar>
                                Search for a genre or click a button below
                                <div className="input-group">
                                    <input className= "form-control" type='text' value={this.state.searchTerm} onChange={this.updateGenres}/>
                                    <span className="input-group-btn">
                                    </span>
                                </div>
                            </GenreSearchBar> 
                        </form>
                        <div className="text-center">
                            <Button  bsStyle="success"><a href="http://localhost:3000/#/songPage">Generate Song</a></Button>
                            <Button onClick={this.resetButton} className = "btn btn-default" bsStyle = "success">Reset Selected Genres</Button>
                        </div>
                    </Jumbotron>  
                </Col>
                <br></br>
                {this.renderButtons()}
                </Grid>
            </div>
        );
    }
}

export default GenreSelection;