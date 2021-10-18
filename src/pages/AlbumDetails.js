import React, {useEffect, useState} from "react"
import '../assets/styles/AlbumDetails.css'
import {useHistory, useParams} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import TrackRow from "../components/TrackRow";
import previous from "../assets/icons/previous.png"

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
    accessToken: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).access_token : ''
})

export default function AlbumDetails() {
    const [album, setAlbum] = useState({})
    const [tracks, setTracks] = useState([])
    let { albumId } = useParams()
    const history = useHistory()

    useEffect(() => {
        let apiRequest = spotifyApi.getAlbum(albumId)

        apiRequest.then(response => {
            setAlbum({
                artist: response.body.artists[0].name,
                title: response.body.name,
                releaseDate: response.body.release_date,
                totalTracks: response.body.total_tracks,
                albumUrl: response.body.images[1].url
            })})

        apiRequest.then(response => {
            setTracks(response.body.tracks.items.map(track =>{
                return ({
                    trackNumber: track.track_number,
                    title: track.name,
                    artist: track.artists,
                    duration: track.duration_ms
                })
            }))
        })
    }, [albumId])

    function handlePrevious() {
        history.push("/")
    }

    return (
        <div>
            <img
                src={previous}
                className="previous-btn position-absolute"
                onClick={handlePrevious}
                alt="Nouvelle recherche"
                title="Nouvelle recherche"
            />
            <div className="d-flex flex-column" style={{marginTop: 70}}>
                <div className="header d-flex p-3 align-items-end">
                    <img
                        src={album.albumUrl}
                        alt={album.title}
                        className="border border-white border-5"
                        style={{height: 240, width: 240}}
                    />
                    <div className="d-flex flex-column ps-3">
                        <div className="fw-bold fs-6 py-4">Album</div>
                        <div className="fw-bolder fs-1 py-3">{album.title}</div>
                        <div className="fw-bolder fs-6">
                            {album.artist}&nbsp;
                            <span className="release-year">
                            {album.releaseDate ? ' \u2022 ' + album.releaseDate.slice(0, 4) : ''}
                        </span>
                        </div>
                    </div>
                </div>
                <div className="track-list d-flex flex-column p-3 mb-5 w-100">
                    <div className="track-list-title row mx-4 py-2">
                        <div className="col fw-bolder fs-6 text-end" style={{flex: "0 0 40px"}}>#</div>
                        <div className="col fw-bolder fs-6">Titre</div>
                        <div className="col fw-bolder fs-6 text-center" style={{flex: "0 0 50px"}}>Duration</div>
                    </div>
                    {tracks ? tracks.map(track => (
                        <TrackRow
                            track={track}
                            key={track.trackNumber}
                        />
                    )) : ''}
                </div>
            </div>
        </div>
    )
}
