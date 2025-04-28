import React from 'react';
import Scoreboard from '../../components/main/Scoreboard.jsx';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import '../../assets/styles/scoreboard.css';

const ScoreboardPage = () => {
    // Force scroll to top when component mounts
    React.useEffect(() => {
        window.scrollTo(0, 0);

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.width = '100%';
    }, []);

    return (
        <div>
            {/* Header area */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Header />
            </div>
            <Scoreboard />
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Footer />
            </div>
        </div>
    );
};

export default ScoreboardPage;