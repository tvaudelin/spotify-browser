import React from "react"

export default function VignetteAlbum({ track }) {
    return (
        <div
            className="d-flex flex-column m-2 align-items-center"
            style={{ height: "277px", width: "200px", cursor: "pointer", backgroundColor: "#181818", padding: "16px", overflow: "hidden"}}
            //onClick={}
        >
            <img src={track.albumUrl} style={{ height: "180px", width: "180px" }} />
            <div className="mt-3 text-white">
                <div
                    className={"fw-bolder"}
                    style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        display: "block",
                        width: "180px"
                    }}
                >
                    {track.title}
                </div>
                <div
                     className="fw-light"
                     style={{
                         textOverflow: "ellipsis",
                         whiteSpace: "nowrap",
                         overflow: "hidden",
                         display: "block",
                         width: "180px"
                     }}
                >
                    {track.artist}
                </div>
            </div>
        </div>
    )
}

