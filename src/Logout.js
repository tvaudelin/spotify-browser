import React from "react"
import {useHistory} from "react-router-dom";
import {useAuth} from "react-oauth2-pkce";
import logout from "./assets/icons/logout.png"

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
            right: "20px",
        }}>
            <img
                src={logout}
                onClick={HandleLogout}
                style={{
                    cursor: "pointer",
                    height: 35,
                    width: 35
                }}
                alt="Déconnexion"
                title="Déconnexion"
            />
        </div>
    )
}