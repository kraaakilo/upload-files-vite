export function getFileExtension(value) {
    let array = value.split(".");
    return array[array.length - 1];
}

export function canShowThumbnails(ext) {
    let exts = ["jpg", "png", "jpeg"]
    return exts.find((a) => a === ext);
}

export function uploadFileService(file) {
    return new Promise((resolve) => {
        let formData = new FormData();
        formData.append("file", file);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (data) => {
            if (xhr.readyState === 4) {
                resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.open("POST", "http://localhost:8000");
        xhr.send(formData);
    })


}