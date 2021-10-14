import React from "react"
import './App.css'
import {Container} from "react-bootstrap"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Search from "./Search";
import AlbumDetails from "./AlbumDetails";
import Logout from "./Logout";

export default function App() {
    document.body.style.backgroundColor = "#121212"

    return (
        <Router>
            <Container className="d-flex-column align-items-center">
                <Logout />
                <Switch>
                    <Route exact path="/">
                        <Search />
                    </Route>
                    <Route path="/album/:albumId">
                        <AlbumDetails />
                    </Route>
                </Switch>

            </Container>
        </Router>
    );
}


