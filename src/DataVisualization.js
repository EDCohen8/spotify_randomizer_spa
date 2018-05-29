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
            chartData:{}
        }
    }

    getArtist(){

        spotifyWeb.getArtistRelatedArtists(global.artist).then((response) =>
            this.setState({
                artists: response.artists
            }));
        console.log(global.artist)
        console.log(this.state.artists)

    }

    componentWillMount(){
        this.getChartData();
        this.getArtist()
    }

    getChartData(){

        this.setState({
            chartData:{
                labels: ['Muse', 'Posty', 'Kanye', 'Cardi B', 'Bad Bunny', 'BTS'],
                datasets:[
                    {
                        label:'Popularity',
                        data:[
                            90,
                            100,
                            1,
                            10,
                            40,
                            30
                        ],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ]
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">

                    <Grid>
                        <h2>Data Visualization</h2>
                    </Grid>
                </div>
                <Chart chartData={this.state.chartData} location="J Cole" legendPosition="bottom"/>
            </div>
        );
    }
}



export default DataVisualization;