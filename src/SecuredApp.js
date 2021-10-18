import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/SecuredApp.css'
import {AuthProvider, AuthService} from 'react-oauth2-pkce'
import App from "./App";

// noinspection JSCheckFunctionSignatures
const authService = new AuthService({
    clientId: process.env.REACT_APP_CLIENT_ID,
    authorizeEndpoint: process.env.REACT_APP_AUTHORIZE_ENDPOINT,
    tokenEndpoint: process.env.REACT_APP_TOKEN_ENDPOINT,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    scopes: ['user-read-email'],
    autoRefresh: true
});

function SecuredApp() {
    document.body.style.backgroundColor = "#121212"

    return (
        <AuthProvider authService={authService} >
            <App />
        </AuthProvider>
    );
}

export default SecuredApp