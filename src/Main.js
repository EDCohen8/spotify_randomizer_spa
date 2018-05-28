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
import NavBar from "./StyleComponents/NavBar"
import Login from "./Login"

class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1>Spotify Random Song SPA</h1>
                <ul className="header">
                    <NavBar><NavLink to="/">LOGIN(TEMP)</NavLink></NavBar>
                    <NavBar><NavLink to="/home">Home</NavLink></NavBar>
                    <NavBar><NavLink to="/dataVisualization">Data Visualization</NavLink></NavBar>
                    <NavBar><NavLink to="/genreSelection">Genre Selection</NavLink></NavBar>
                    <NavBar><NavLink to="/songPage">Song</NavLink></NavBar>
                </ul>
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