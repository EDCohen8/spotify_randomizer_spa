import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import DataVisualization from "./DataVisualization";
import GenreSelection from "./GenreSelection";
import SongPage from "./SongPage"
import Login from "./Login"
import NavBar from "./CustomNavbar"

class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1 class="text-center text-success"> <strong>Spotify Random Song SPA </strong></h1>
                <NavBar />
                <div className="content">
                    <Route path="/" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/dataVisualization" component={DataVisualization}/>
                    <Route path="/genreSelection" component={GenreSelection}/>
                    <Route path="/songPage" component={SongPage}/>

                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Main;