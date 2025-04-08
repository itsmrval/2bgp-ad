import React from 'react';
import Scoreboard from '../../components/main/Scoreboard.jsx';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import '../../assets/styles/scoreboard.css';

const ScoreboardPage = () => {
    // Force scroll to top when component mounts
    React.useEffect(() => {
        window.scrollTo(0, 0);
        
        // Reset body styles to ensure proper display
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.width = '100%';
    }, []);
    
    return (
        <div className="page-wrapper">
            <Header />
            <main className="scoreboard-main-content">
                <div className="scoreboard-container-centered">
                    <Scoreboard />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ScoreboardPage;