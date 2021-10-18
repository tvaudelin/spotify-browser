import React from "react"
import {useHistory} from "react-router-dom";

export default function VignetteAlbum({ album }) {
    const history = useHistory()

    function OpenAlbum() {
        history.push("/album/" + album.id)
    }
    return (
        <div
            className="d-flex flex-column m-2 align-items-center"
            style={{
                height: "277px",
                width: "200px",
                cursor: "pointer",
                backgroundColor: "#181818",
                padding: "16px",
                overflow: "hidden"
            }}
            onClick={OpenAlbum}
        >
            <img
                src={album.albumUrl ? album.albumUrl : album.id}
                style={{ height: "180px", width: "180px" }}
                alt=''
            />
            <div className="mt-3 text-white">
                <div
                    className="fw-bolder"
                    style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        display: "block",
                        width: "180px"
                    }}
                    title={album.title}
                >
                    {album.title}
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
                     title={album.artist}
                >
                    {album.artist}
                </div>
            </div>
        </div>
    )
}

