import React from "react"

export default function TrackRow({ track }) {
    function msToTime(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ?
                (minutes+1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        )
    }

    return (
        <div className={"track-list-row row mx-4 py-2"}>
            <div className={"col fw-bolder fs-6 text-end"} style={{flex: "0 0 40px"}}>{track.trackNumber}</div>
            <div className={"col fw-bolder fs-6"}>{track.title}</div>
            <div className={"col fw-bolder fs-6 text-center"}  style={{flex: "0 0 50px"}}>{msToTime(track.duration)}</div>
        </div>
    )
}