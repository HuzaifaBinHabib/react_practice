import React from 'react';
import './Contact.css'; // Import the CSS file for styling
import Bort from'./../Home/Bort'

const ContactPage = () => {
    return (
        <div className="contact-page">


            <section className="contact-section">
                <h1>Contact Us</h1>
                
                <div className="contact-details">
                <p>If you have any questions, feel free to reach out to us through any of the following methods:</p>
                    <p><strong>Email:</strong> <a href="mailto:contact@company.com">contact@company.com</a></p>
                    <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                    <p><strong>Address:</strong> 123 Main Street, City, Country</p>
                </div>
            </section>
            <Bort/>

            <footer>
                <p>© 2024 All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default ContactPage;
