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
            artists: {},
            artistsNames: [],
            popularity: [],
            chartData:{},
        }
        this.getArtist = this.getArtist.bind(this)
        this.setName = this.setName.bind(this)
        this.getArtist()
        this.getChartData()
    }


    getArtist(){
        spotifyWeb.getArtistRelatedArtists(global.artist).then((response) =>
            this.setState({
                artists: response.artists.slice(0,5)

            }, () => {this.setName()}));

        console.log(this.state.artists)


        console.log(this.state.artistsNames)
        console.log('g '+ global.artist)

    }

    setName(){
        var art = []
        var pop = []
        for (var i = 0, emp; i < 5; i++) {
            emp = this.state.artists[i];
            art.push(emp.name)
            pop.push(emp.popularity)
        }
        this.setState({
            artistNames: art,
            popularity: pop
        }, () => {console.log(this.state)});
        console.log("this state" + this.state)

    }


    getChartData(){

        this.setState({
            chartData:{
                labels: this.state.artistsNames,
                datasets:[
                    {
                        label:'Popularity',
                        data: this.state.popularity,
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ]
                    }
                ]
            }
        });

        console.log("state: " + this.state)
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">

                    <Grid>
                        <h2>Data Visualization</h2>
                    </Grid>
                </div>
                <Chart chartData={this.state.chartData} location="" legendPosition="bottom"/>
            </div>
        );
    }
}



export default DataVisualization;