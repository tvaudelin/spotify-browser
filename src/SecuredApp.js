import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './SecuredApp.css'
import { AuthProvider, AuthService, useAuth } from 'react-oauth2-pkce'
import {Button, Spinner} from 'react-bootstrap'

const authService = new AuthService({
    clientId: process.env.REACT_APP_CLIENT_ID,
    authorizeEndpoint: process.env.REACT_APP_AUTHORIZE_ENDPOINT,
    tokenEndpoint: process.env.REACT_APP_TOKEN_ENDPOINT,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    scopes: ['user-read-email'],
    autoRefresh: true
});

function SecuredApp() {
    const { authService } = useAuth();

    const login = async () => authService.authorize();
    const logout = async () => authService.logout();

    if (authService.isPending()) {
        return <div className={"header-logged-out text-white py-3"}>
            <Spinner
                className={"spinner-border text-success my-5"}
                style={{height: '5rem', width: '5rem'}}
                animation={'border'}
            />
            <p className={"mx-5"}>Connexion en cours...</p>
            <p className={'pt-3'}>Un soucis&nbsp;? N'hésitez pas à
                <a href={''}
                   onClick={() => { logout(); login(); }}
                   style={{color: '#10BC4C'}}>
                    retenter votre chance&nbsp;!
                </a>
            </p>
        </div>
    }

    if (!authService.isAuthenticated()) {
        return (
            <div className={"header-logged-out text-white py-3"}>
                <p>Vous devez vous connecter à votre compte Spotify pour accéder au moteur de recherche&nbsp;:</p>
                <Button
                    className={"rounded-pill border-0 px-5 py-3 fw-bolder"}
                    onClick={login}
                    style={{background: '#10BC4C'}}
                >
                    CONNEXION
                </Button>
            </div>
        )
    }

    return (
        <div>
            <App />
        </div>
    );
}

function WrappedSecuredApp() {
    return (
        <AuthProvider authService={authService} >
            <SecuredApp />
        </AuthProvider>
    );
}

export default WrappedSecuredApp;