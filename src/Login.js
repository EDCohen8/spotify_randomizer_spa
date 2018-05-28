import React, { Component } from "react";
import Cookies from "universal-cookie";

class Login extends Component {

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
        return (
            <div>
                <a href ='http://localhost:8888'>
                    <button>Login With Spotify</button>
                </a>
            </div>
        );
    }
}

export default Login;