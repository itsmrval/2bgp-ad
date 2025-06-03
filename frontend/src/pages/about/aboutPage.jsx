import Team from '../../components/team/team.jsx';
import Header from '../../components/header/Header.jsx';

const AboutPage = () => {
    return (
        <div>
            {/* Header area */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Header />
            </div>
            
            {/* Main content area */}
            <div>
                <Team />
            </div>
            
        </div>
    );
};

export default AboutPage;
