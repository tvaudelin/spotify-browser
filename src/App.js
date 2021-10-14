import './App.css'
import {Container, Button} from "react-bootstrap"
import {useState, useEffect} from "react"
import {useAuth} from "react-oauth2-pkce"
import SpotifyWebApi from "spotify-web-api-node"
import React from "react"
import VignetteAlbum from "./VignetteAlbum";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
})
const accessToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : ''
const refreshToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).refresh_token : ''

function App() {
    document.body.style.backgroundColor = "#121212"
    const { authService } = useAuth();
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const logout = async () => authService.logout();

    useEffect(() => {
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.setRefreshToken(refreshToken)
    }, [])

    useEffect(() => {
        if (!search) return setSearchResults([])

        let cancel = false

        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.album.images[1].url,
                    }
                })
            )
        })
        return () => (cancel = true)
    }, [search])

    return (
        <Container className="d-flex-column align-items-center">
            <div className="logout">
                <Button
                    className={"btn-sm px-3 border-1 rounded-pill"}
                    onClick={logout}
                    style={{
                        background: '#121212',
                        borderColor: '#10BC4C',
                        color: '#10BC4C',

                    }}
                >
                    Déconnexion
                </Button>
            </div>

            <div className={""}>
                <div className={"form-group d-flex justify-content-center my-5"}>
                    <label htmlFor="searchInput" />
                    <input
                        type="search"
                        className={"form-control rounded-pill px-4"}
                        id={"searchInput"}
                        placeholder={"Artiste, album, titre..."}
                        style={{ width: 600}}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className={"d-flex flex-wrap"}>
                {searchResults.map(track => (
                    <VignetteAlbum
                        track={track}
                        key={track.uri}
                    />
                ))}
            </div>

        </Container>
    );
}

export default App;
