import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import { Navbar, Nav, NavItem} from 'react-bootstrap';


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
                <NavItem eventKey={1} componentClass={Link} href="/" to="/"> Home </NavItem>
                <NavItem eventKey={2} componentClass={Link} href="/genreSearch" to="/genreSearch"> Genre Search </NavItem>
                 <NavItem eventKey={3} componentClass={Link} href="/dataVisualization" to="/dataVisualization"> Data Visualization </NavItem>
                <NavItem eventKey={4} componentClass={Link} href="/genreSelection" to="/genreSelection"> Genre Selection </NavItem>
                 <NavItem eventKey={5} componentClass={Link} href="/songPage" to="/songPage"> Song </NavItem>
                
        
                    
                
            </Nav>
        </Navbar>
        )
    }
}
