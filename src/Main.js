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


class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1>Spotify Random Song SPA</h1>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/genreSearch">Genre Search</NavLink></li>
                    <li><NavLink to="/dataVisualization">Data Visualization</NavLink></li>
                    <li><NavLink to="/genreSelection">Genre Selection</NavLink></li>
                </ul>
                <div className="content">
                    <Route path="/" component={Home}/>
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