import React from 'react';
import './About.css'; // Import the CSS file for styling
import Bort from'./../Home/Bort'

const AboutPage = () => {
    return (
        <div className="about-page">



            <section className="about-section">
                <div className="about-content">
                    <h1>About Us</h1>
                    <p>Welcome to our website! We are a passionate team of developers working on innovative projects.</p>

                    <h2>Our Mission</h2>
                    <p>Our mission is to bring powerful web applications to life, ensuring user-centric designs and seamless experiences.</p>

                    <h2>Our Values</h2>
                    <ul>
                        <li>Innovation</li>
                        <li>Quality</li>
                        <li>Customer Satisfaction</li>
                    </ul>

                    <h2>Meet the Team</h2>
                    <p>Our team consists of developers, designers, and strategists working together to create impactful solutions.</p>
                </div>
            </section>
             <Bort/>
            <footer>
                <p>© 2024 All Rights Reserved</p>
            </footer>

        </div>
    );
};

export default AboutPage;
