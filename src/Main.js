import React, { Component } from "react";
import {
    Route,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import GenreSearch from "./GenreSearch";
import DataVisualization from "./DataVisualization";
import GenreSelection from "./GenreSelection";
import SongPage from "./SongPage"
import NavBar from "./CustomNavbar"


class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1 class="text-center text-success"><strong>Spotify Random Song SPA</strong></h1>
                <NavBar />
                    <Route path="/" component={Home}/>
                    <Route path="/genreSearch" component={GenreSearch}/>
                    <Route path="/dataVisualization" component={DataVisualization}/>
                    <Route path="/genreSelection" component={GenreSelection}/>
                    <Route path="/songPage" component={SongPage}/>

            </div>
            </HashRouter>
        );
    }
}

export default Main;