import React, { Component } from "react";
import {Grid} from "react-bootstrap"
import Chart from './GraphComponent/Chart';
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import * as global from "./globals";

const spotifyWeb = new Spotify();
const cookies = new Cookies();

spotifyWeb.setAccessToken(cookies.get("access_token"));

class DataVisualization extends Component {

    constructor(){
        super();
        this.state = {
            artistNames: global.art,
            popularity: global.pop,
            ids: global.artists,
            chartData:{}
        }
    }

    componentWillMount(){
        this.getChartData();
    }

    getChartData(){
        this.setState({
            chartData:{
                labels: global.art,
                datasets:[
                    {
                        label:'Popularity',
                        data:global.pop,
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ],
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div className="App">

                <table border="3" cellPadding="3" align="left">
                    <tr>
                        <td>Artist link: (Click me)   |</td>
                        <td>Popularity:     </td>
                    </tr>
                    <tr>
                        <td><a href={this.state.ids[0]} target="_blank">{this.state.artistNames[0]}</a></td>
                        <td>{this.state.popularity[0]}</td>
                    </tr>
                    <tr>
                        <td><a href={this.state.ids[1]} target="_blank">{this.state.artistNames[1]}</a></td>
                        <td>{this.state.popularity[1]}</td>
                    </tr>
                    <tr>
                        <td><a href={this.state.ids[2]} target="_blank">{this.state.artistNames[2]}</a></td>
                        <td>{this.state.popularity[2]}</td>
                    </tr>
                    <tr>
                        <td><a href={this.state.ids[3]} target="_blank">{this.state.artistNames[3]}</a></td>
                        <td>{this.state.popularity[3]}</td>
                    </tr>
                    <tr>
                        <td><a href={this.state.ids[4]} target="_blank">{this.state.artistNames[4]}</a></td>
                        <td>{this.state.popularity[4]}</td>
                    </tr>
                </table>

                <Chart chartData={this.state.chartData} location={global.name} legendPosition="top"/>
            </div>
        );
    }
}



export default DataVisualization;