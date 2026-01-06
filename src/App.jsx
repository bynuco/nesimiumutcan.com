import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import AppShowcase from './components/AppShowcase';
import SupportPage from './pages/SupportPage';
import { LanguageProvider } from './context/LanguageContext';

// Layout component for Home page (Hero + Showcase)
const Home = () => (
    <>
        <Hero />
        <AppShowcase />
    </>
);

function App() {
    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:appName/support" element={<SupportPage />} />
                </Routes>
            </Router>
        </LanguageProvider>
    );
}

export default App;
