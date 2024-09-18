import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MainContent from './mainContent'; // Import the MainContent component
import PressReleaseHistory from './PressReleaseHistory';

import './App.css';

const App = () => {
    return (
        <div className="app">
            <Router>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/history" element={<PressReleaseHistory />} />
                    </Routes>
                </main>
            </Router>
        </div>
    );
};

export default App;


