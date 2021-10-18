import React from "react"
import './App.css'
import {Container} from "react-bootstrap"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Search from "./Search";
import AlbumDetails from "./AlbumDetails";
import Logout from "./Logout";
import Login from "./Login";
import {useAuth} from "react-oauth2-pkce";

export default function App() {

    function PrivateRoute({ children, ...rest }) {
        const { authService } = useAuth();
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    authService.isAuthenticated() ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        );
    }

    return (
        <Router>
            <Container className="d-flex-column align-items-center">
                <Logout />
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>

                    <PrivateRoute exact path="/search">
                        <Search />
                    </PrivateRoute>
                    <PrivateRoute path="/album/:albumId">
                        <AlbumDetails />
                    </PrivateRoute>
                </Switch>

            </Container>
        </Router>
    );
}


