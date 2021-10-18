import React from "react"
import './assets/styles/App.css'
import {Container} from "react-bootstrap"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Search from "./pages/Search";
import AlbumDetails from "./pages/AlbumDetails";
import Logout from "./components/Logout";
import Login from "./components/Login";
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
                    <PrivateRoute exact path="/album/:albumId">
                        <AlbumDetails />
                    </PrivateRoute>
                </Switch>

            </Container>
        </Router>
    );
}


