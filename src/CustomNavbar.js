import React, { Component } from "react";
import {
    Link, HashRouter
} from "react-router-dom";
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import "./StyleComponents/navbar.css"
import Cookies from "universal-cookie";

export default class CustomNavbar extends Component{
    constructor(){
        super()
         const params = this.getHashParams();

        let auth_token = params["/access_token"]
        console.log("Success")
        console.log("Creating Cookies")
        // get cookies with cookies.get("access_token")
        const cookies = new Cookies()
        cookies.set("access_token", auth_token, { path: '/' }) 
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


    render() {
        return(
        <HashRouter>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <p className="text-success"> Random Spotify Player</p>
                    </Navbar.Brand>
                    </Navbar.Header>
                    <Nav >
                        <NavItem eventKey={1} componentClass={Link} href="/songPage" to="/songPage"><ins> Song</ins> </NavItem>
                        <NavItem eventKey={2} componentClass={Link} href="/dataVisualization" to="/dataVisualization"><ins> Data Visualization</ins> </NavItem>
                        <NavItem eventKey={3} componentClass={Link} href="/genreSelection" to="/genreSelection"> <ins> Genre Selection</ins> </NavItem>
                        <NavItem eventKey={4} componentClass={Link} href="/login" to="/login"><ins> Login</ins> </NavItem>
                    </Nav>
            </Navbar>
        </HashRouter>
        )
    }
}
