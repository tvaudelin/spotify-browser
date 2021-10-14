import React from "react"
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useAuth} from "react-oauth2-pkce";

export default function Logout() {
    const { authService } = useAuth();
    const history = useHistory()
    function HandleLogout() {
        history.push("/")
        authService.logout().then()
    }

    return (
        <div style={{
            position: "absolute",
            top: "20px",
            left: "20px",
        }}>
            <Button
                className={"btn-sm px-3 border-1 rounded-pill"}
                onClick={HandleLogout}
                style={{
                    background: '#121212',
                    borderColor: '#10BC4C',
                    color: '#10BC4C',
                }}
            >
                Déconnexion
            </Button>
        </div>
    )
}