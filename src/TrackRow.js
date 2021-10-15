import React from "react"

export default function TrackRow({ track }) {
    console.log(track)

    function msToTime(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return (
            seconds === 60 ?
                (minutes+1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        )
    }

    return (
        <div className="track-list-row row mx-4 py-2">
            <div
                className="col fw-bolder fs-6 text-end my-auto"
                style={{flex: "0 0 40px"}}
            >
                {track.trackNumber}
            </div>
            <div className="col d-flex flex-column fw-bolder fs-6">
                <div className="track-list-row-title fw-bolder fs-6">
                    {track.title}
                </div>
                <div className="fw-bold fs-6">
                    { track.artist.length === 1
                        ? track.artist[0].name
                        : track.artist.map((artist, index) => (
                            artist.name + ((index + 1) === track.artist.length ? '' : ' \u2022 ')
                        ))
                    }
                </div>
            </div>
            <div
                className="col fw-bolder fs-6 text-center my-auto"
                style={{flex: "0 0 50px"}}
            >
                {msToTime(track.duration)}
            </div>
        </div>
    )
}