import React from "react"
import {useAuth} from "react-oauth2-pkce";
import {Button, Spinner} from "react-bootstrap";
import {Redirect} from "react-router-dom";

export default function Login() {
    const { authService } = useAuth();
    const login = async () => authService.authorize();
    const logout = async () => authService.logout();

    if (authService.isPending()) {
        return <div className="header-logged-out text-white py-3">
            <Spinner
                className="spinner-border text-success my-5"
                style={{height: '5rem', width: '5rem'}}
                animation="border"
            />
            <p className="mx-5">Connexion en cours...</p>
            <p className="pt-3">Un soucis&nbsp;? N'hésitez pas à&nbsp;
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href={''}
                   onClick={() => { logout()
                       .then(() => {
                               login().then()
                       })
                   }}
                   style={{color: '#1c5b2b'}}
                >
                    retenter votre chance&nbsp;!
                </a>
            </p>
        </div>
    } else if (!authService.isAuthenticated()) {
        return (
            <div className="header-logged-out text-white py-3">
                <p style={{marginTop: 100}}>
                    Vous devez vous connecter à votre compte Spotify <br/>
                    pour accéder au moteur de recherche&nbsp;:
                </p>
                <Button
                    className="rounded-pill border-0 px-5 py-3 fw-bolder"
                    onClick={login}
                    style={{background: '#10BC4C', marginTop: 40}}
                >
                    CONNEXION
                </Button>
            </div>
        )
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/search",
                }}
            />
        )
    }
}