import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/app.scss';
import {UploadComponent} from "./components/UploadComponent.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UploadComponent/>
    </React.StrictMode>,
)
