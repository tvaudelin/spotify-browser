import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
})

const accessToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : ''

export default function AlbumDetails() {
    const [album, setAlbum] = useState({})
    const [tracks, setTracks] = useState({})
    let { albumId } = useParams()

    useEffect(() => {
        spotifyApi.setAccessToken(accessToken)
    }, [])

    useEffect(() => {
        spotifyApi.getAlbum(albumId)
            .then(res => {
                setAlbum({
                    artist: res.body.artists[0].name,
                    title: res.body.name,
                    releaseDate: res.body.release_date,
                    totalTracks: res.body.total_tracks,
                })
                setTracks(res.body.tracks.items.map(track =>{
                    return {
                        trackNumber: track.track_number,
                        title: track.name,
                        artist: track.artists,
                        duration: track.duration_ms
                    }
                }))
            })
            .catch((e) => {console.log(e)})
    }, [albumId])


    return (
        <div className="d-flex flex-wrap justify-content-center text-white" style={{marginTop: 70}}>
            <div className={"d-flex"}>l'id de l'album est {albumId}</div>
            <div className={"d-flex"}>{JSON.stringify(album)}</div>
            <div className={"d-flex"}>{JSON.stringify(tracks)}</div>
        </div>
    )
}
