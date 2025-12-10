import React from "react";
import "./Home.css";

const Home: React.FC = () => {
    const renderCircles = () => {
        return (
            <div className="container">
                <div className="graf-bg-container">
                    <div className="graf-layout">
                        {Array.from({ length: 11 }).map((_, index) => (
                            <div key={index} className="graf-circle"></div>
                        ))}
                    </div>
                </div>
                <h1 className="home-title">React Login</h1>
            </div>
        );
    };
    return <div className="home-container">{renderCircles()}</div>;
};
export default Home;