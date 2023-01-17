import React, {useEffect, useState} from "react";
import {canShowThumbnails, getFileExtension, uploadFileService} from "../utils/services.js";

export const UploadComponent = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [filename, setFilename] = useState("");
    const [success, setSuccess] = useState(false);
    const [uploadUrl, setUploadUrl] = useState("");
    useEffect(() => {
        document.getElementById("file").addEventListener("change", (event) => {
            setSuccess(false);
            let assertion = canShowThumbnails(getFileExtension(event.target.files[0].name));
            if (assertion !== undefined) {
                setThumbnailUrl(URL.createObjectURL(event.target.files[0]));
            } else {
                setThumbnailUrl("/file.png");
            }
            setFilename(event.target.files[0].name)
        })
    }, [])

    function submit(event) {
        event.preventDefault();
        uploadFileService(document.getElementById("file").files[0]).then(result => {
            reset();
            setUploadUrl(result.message)
            setSuccess(true);
        });
    }

    function reset() {
        setThumbnailUrl("");
    }

    function dropHandler(event) {
        event.preventDefault();
        let item = event.dataTransfer.items[0];
        if (item.kind === 'file') {
            const file = item.getAsFile();
            console.log(` ${file.name}`);
            let assertion = canShowThumbnails(getFileExtension(file.name));
            if (assertion !== undefined) {
                setThumbnailUrl(URL.createObjectURL(file));
            } else {
                setThumbnailUrl("/file.png");
            }
        }
    }

    function dragOverHandler(ev) {
        console.log('File(s) in drop zone');
        ev.preventDefault();
    }

    return <div className="upload-container">
        <div className="close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </div>
        <div className="folder-icon">
            <div className="folder-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                        d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z"/>
                </svg>

            </div>
        </div>
        <div className="description">
            <h1>Upload your attachments</h1>
            <p>Drag and drop files here</p>
        </div>
        {success && <div><h2 className="success">File uploaded successfully !</h2>
            <a href={uploadUrl}>{uploadUrl}</a>
        </div>}

        <div className="upload" onDragOver={dragOverHandler} onDrop={dropHandler}
             onClick={() => document.getElementById("file").click()}>
            {thumbnailUrl.length > 0 && <div className="flex all-center">
                <img src={thumbnailUrl} alt="thumbnails" id="thumbnails"/>
                <h3>{filename}</h3>
            </div>}
            {thumbnailUrl.length === 0 && <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                </svg>
                <p>.PDF .JPG .PNG .DOC</p>
                <p>You can also add files by</p>
                <p><a href="#">clicking here</a></p>
            </>}
            <input type="file" id="file" name="file"/>
        </div>
        {thumbnailUrl.length > 0 &&
            <div className="btn-container">
                <a onClick={reset}>Cancel</a><a onClick={submit}>Start Upload</a>
            </div>}
    </div>;
}