import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import GenreSearch from "./GenreSearch";
import DataVisualization from "./DataVisualization";
import GenreSelection from "./GenreSelection";
import NavBar from "./StyleComponents/NavBar"


class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1>Spotify Random Song SPA</h1>
                <ul className="header">
                    <NavBar><NavLink to="/home">Home</NavLink></NavBar>
                    <NavBar><NavLink to="/genreSearch">Genre Search</NavLink></NavBar>
                    <NavBar><NavLink to="/dataVisualization">Data Visualization</NavLink></NavBar>
                    <NavBar><NavLink to="/genreSelection">Genre Selection</NavLink></NavBar>
                </ul>
                <div className="content">
                    <Route path="/home" component={Home}/>
                    <Route path="/genreSearch" component={GenreSearch}/>
                    <Route path="/dataVisualization" component={DataVisualization}/>
                    <Route path="/genreSelection" component={GenreSelection}/>
                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Main;