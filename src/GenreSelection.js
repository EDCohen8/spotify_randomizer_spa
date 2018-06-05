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
        let auth_token = params["/genreSelection/access_token"];
        console.log(params);
        console.log(auth_token);
        spotifyWeb.setAccessToken(auth_token);

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
        this.getArt = this.getArt.bind(this);
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

//getting similar artists
getArt(){
    spotifyWeb.getArtistRelatedArtists(global.artist).then((response) =>
        this.setState({
            artists: response.artists.slice(0,5)

        }, () => {this.setName()}));

    console.log(this.state.artists)


    console.log(this.state.artistNames);
    console.log('g '+ global.artist);

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
    }, () => {console.log(this.state.artistNames + " " + this.state.popularity)});
    console.log("this state" + this.state)
    global.addArt(art);
    global.addPop(pop);
    global.addArtists(ids);
    console.log("ids" + ids)
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
//getting the id of the artist and setting the url
    getSongUrl(){
        var song = {}
        var url =''
        for (var i = 0, emp; i < this.state.tracks.length; i++) {
            emp = this.state.tracks[i];
            song[ emp.id] = emp.id;
            url = song[emp.id]
        }

        console.log("url " + url)
        console.log(this.state.tracks)
        this.setState({
            url: "https://open.spotify.com/embed/track/" + url
        })
        global.addTrack(this.state.url)
        return url;
    }

    getArtist(){
        var artists = {}
        var id ='';
        var artistID =''
        var artistID = {}
        for (var i = 0, emp; i < this.state.tracks.length; i++) {
            emp = this.state.tracks[i];
            artists[ emp.id] = emp.id;
            id = artists[emp.id]
            artists[emp.name] = emp.artists;
            artistID = emp.artists[0].id
        }

        console.log("id " + id)
        global.addArtist(artistID)
        spotifyWeb.getArtistRelatedArtists(artistID).then((response) =>
            this.setState({
                artist: response.artists
            }));

        console.log(artists)
        console.log(artistID)
        console.log('g '+ global.artist)
        console.log(this.state.artist)
        return id;

    }
    generateSong(){
        var num = Math.floor((Math.random() * 60) + 1);
        spotifyWeb.getRecommendations(({
            limit: 1,
            market: 'US',
            seed_genres: this.state.genres.toString(),
            target_popularity: num
        })).then((response) =>
            this.setState({
                tracks: response.tracks
            }));
        this.getArt();

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
        if(global.genres.length == 5){
            return 'MAX NUMBER OF GENRES SELECTED'
        }
    }

    resetButton() {
        this.setState({searchTerm: "",
            currentlyDisplayed: this.state.spotifyGenres,
            genres: []})
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
                        <h2 class="text-center"><strong> Genre Selection </strong></h2>
                    </Panel.Heading>   
                    <Panel.Body>             
                        <p>Welcome to the genre selection page of the spotify song picker! <br></br>
                        Below are a list of the many genres that are available for our generator.<br></br><br></br>
                            Select up to 5 genres!<br></br>
                            Selected genres: {global.genres.toString()}<br></br>
                            {this.maxNum()}</p>
                    </Panel.Body>
                </Panel>
                </Col>
                    
                <Col md={5}>
                    <Jumbotron>
                        <form>
                            <GenreSearchBar>
                                Search for a genre or click a button below
                                <div class="input-group">
                                    <input class= "form-control" type='text' value={this.state.searchTerm} onChange={this.updateGenres}/>
                                    <span class="input-group-btn">
                                        <Button onClick={this.resetButton} class = "btn btn-default" bsStyle = "success">Reset </Button>
                                    </span>
                                </div>
                            </GenreSearchBar> 
                        </form>
                        <div className="text-center">
                            <Button  bsStyle="success"><a href="http://localhost:3000/#/songPage">Generate Song</a></Button>
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