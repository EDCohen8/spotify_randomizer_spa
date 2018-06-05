import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import Cookies from 'universal-cookie';
import Spotify from "spotify-web-api-js";
import * as global from '../globals';

const spotifyWeb = new Spotify();
const cookies = new Cookies();

spotifyWeb.setAccessToken(cookies.get("access_token"));



class Chart extends Component{
    constructor(props){
        super();
        this.state = {
            chartData:props.chartData
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
    }


    render(){
        return (
            <div className="chart">
                <Pie
                    data={this.state.chartData}
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text: this.props.location,
                            fontSize:25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;