import React from "react"
import {useAuth} from "react-oauth2-pkce";
import logout from "./assets/icons/logout.png"

export default function Logout() {
    const { authService } = useAuth();
    function HandleLogout() {
        authService.logout().then()
    }

    if (authService.isAuthenticated()) {
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
    } else {
        return null
    }
}