import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import "./StyleComponents/navbar.css"
export default class CustomNavbar extends Component{
    render() {
        return(
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <p class="text-success"> Random Spotify Player</p>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Nav >
                    <NavItem eventKey={1} componentClass={Link} href="/home" to="/home"><ins> Home</ins> </NavItem>
                    <NavItem eventKey={2} componentClass={Link} href="/dataVisualization" to="/dataVisualization"><ins> Data Visualization</ins> </NavItem>
                    <NavItem eventKey={3} componentClass={Link} href="/genreSelection" to="/genreSelection"> <ins> Genre Selection</ins> </NavItem>
                    <NavItem eventKey={4} componentClass={Link} href="/songPage" to="/songPage"><ins> Song</ins> </NavItem>
                </Nav>
        </Navbar>
        )
    }
}
