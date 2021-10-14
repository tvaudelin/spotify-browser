import React, {useEffect, useState} from "react"
import './AlbumDetails.css'
import {useParams} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import TrackRow from "./TrackRow";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
})

const accessToken = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : ''

export default function AlbumDetails() {
    const [album, setAlbum] = useState({})
    const [tracks, setTracks] = useState([])
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
                    albumUrl: res.body.images[1].url
                })
                setTracks(res.body.tracks.items.map(track =>{
                    return ({
                        trackNumber: track.track_number,
                        title: track.name,
                        artist: track.artists,
                        duration: track.duration_ms
                    })
                }))
            })
            .catch((e) => {console.log(e)})
    }, [albumId])


    return (
        <div className="d-flex flex-column" style={{marginTop: 70}}>
            <div className={"header d-flex p-3 align-items-end"}>
                <img
                    src={album.albumUrl}
                    alt={album.title}
                    className={"border border-white border-5"}
                    style={{height: 240, width:240}}
                />
                <div className={"d-flex flex-column ps-3"}>
                    <div className={"fw-bold fs-6 py-4"}>Album</div>
                    <div className={"fw-bolder fs-1 py-3"}>{album.title}</div>
                    <div className={"fw-bolder fs-6"}>
                        {album.artist}&nbsp;
                        <span className={"release-year"}>
                            {album.releaseDate ? ' \u2022 ' + album.releaseDate.slice(0, 4) : ''}
                        </span>
                    </div>
                </div>
            </div>
            <div className={"track-list d-flex flex-column p-3 w-100"}>
                <div className={"track-list-title row mx-4 py-2"}>
                    <div className={"col fw-bolder fs-6 text-end"} style={{flex: "0 0 40px"}}>#</div>
                    <div className={"col fw-bolder fs-6"}>Titre</div>
                    <div className={"col fw-bolder fs-6 text-center"}  style={{flex: "0 0 50px"}}>Duration</div>
                </div>
                { tracks ? tracks.map(track => (
                    <TrackRow
                        track={track}
                        key={track.trackNumber}
                    />
                )) : '' }
            </div>
            <div style={{height: 50}}> </div>
        </div>
    )
}
