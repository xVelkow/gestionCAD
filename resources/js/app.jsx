import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';        
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing';
const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(     
    <StrictMode>
        <Router>
            <Routing />
        </Router>
    </StrictMode>
);