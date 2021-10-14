import React, {useEffect, useState} from "react";
import VignetteAlbum from "./VignetteAlbum";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
})

const accessToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : ''

export default function Search() {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        spotifyApi.setAccessToken(accessToken)
    }, [])

    useEffect(() => {
        if (!search) return setSearchResults([])

        let cancel = false

        spotifyApi.searchAlbums(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.albums.items.map(album => {
                    return {
                        artist: album.artists[0].name,
                        title: album.name,
                        id: album.id,
                        albumUrl: album.images[1].url,
                        uri: album.uri
                    }
                })
            )
        })
            .catch((e) => {
                console.log(e)
            })
        return () => (cancel = true)
    }, [search])

    return (
        <div className="d-flex-column align-items-center">
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
            <div className={"d-flex flex-wrap"}>
                {searchResults.map(album => (
                    <VignetteAlbum
                        album={album}
                        key={album.uri}
                    />
                ))}
            </div>
        </div>
    )
}