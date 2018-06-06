import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter,
    Redirect,
    Switch
} from "react-router-dom";
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
                    
                    <div className="content">
                        <Route path="/" component={NavBar}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/dataVisualization" component={DataVisualization}/>
                        <Route path="/genreSelection" component={GenreSelection}/>
                        <Route path="/songPage" component={SongPage}/>
                        <Switch>
                            <Redirect exact path from="/" to="login" />
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        );
    }
}
export default Main;