import React, { Component } from "react";
import { Toolbar, Typography, AppBar, Button } from "@material-ui/core";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: null,
        };
    }

    todoLogout = () => {
        let token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        fetch("http://localhost:8000/api/user/logout", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    window.location.reload();
                    sessionStorage.clear();
                    let temp = window.location.origin;
                    window.location.href = temp + "/";
                }
            })
            .catch((error) => console.log("error", error));
    };
    componentDidMount() {
        let isLoggedIn = sessionStorage.getItem("isLoggedIn");
        this.setState({ isLoggedIn: isLoggedIn });
    }
    render() {
        const { isLoggedIn } = this.state;
        let logoutDiv = null;
        if (isLoggedIn) {
            logoutDiv = (
                <AppBar position="static" style={{ color: "black", backgroundColor: "rgba(5, 58, 212, 0.82)" }} >
                <Toolbar style={{ display: " flex", justifyContent: "space-between" }} >
                    <Typography variant="h6">IC - Task Manager</Typography>
                    <Button onClick={this.todoLogout}>Logout</Button>
                </Toolbar>
                </AppBar>
            );
        }

        if (!isLoggedIn) {
            logoutDiv = (
                <AppBar position="static" style={{ color: "black", backgroundColor: "rgba(5, 58, 212, 0.82)" }} >
                    <Toolbar style={{ display: " flex", justifyContent: "space-between" }} >
                        <Typography variant="h6">IC - Task Manager</Typography>
                    </Toolbar>
                </AppBar>
            );
        }
        return <div>{logoutDiv}</div>;
    }
}