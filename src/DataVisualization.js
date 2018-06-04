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

    componentWillMount(){
        this.getChartData();
    }

    getChartData(){
        // Ajax calls here
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
                        ]
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Chart chartData={this.state.chartData} location="" legendPosition="bottom"/>
            </div>
        );
    }
}



export default DataVisualization;