
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import '../Footer.css';  
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const FooterComponent = () => {
    return (
        <footer className="footer pt-5">
            <div className="container my-4">
                <div className="row gy-5 gx-md-5 text-center text-md-start">
                    <div className="col-md-6 col-xl-4">
                        <a className="site-logo text-decoration-none fw-bold fs-2" href="#">
                            <span>
                                <FontAwesomeIcon icon={faFileInvoice} />
                            </span>
                            <span className="site-logo-text">Resume</span> Builder
                        </a>
                        <p className="text-grey fs-18 mt-4">Resume Builder is a CV builder that helps users like you to create stunning CVs within 4 minutes</p>
                    </div>

                    <div className="col-md-6 col-xl-2">
                        <h3 className="text-blue">Resume builder</h3>
                        <ul className="list-unstyled mt-4">
                            <li className="my-2">
                                <Link to="/" className="text-decoration-none fs-17 text-dark">Homepage</Link>
                            </li>
                            <li className="my-2">
                                <Link to="/cv-builder" className="text-decoration-none fs-17 text-dark">CV Builder</Link>
                            </li>
                            <li className="my-2">
                                <Link to="/cv-templates" className="text-decoration-none fs-17 text-dark">CV Templates</Link>
                            </li>
                            <li className="my-2">
                                <Link to="/login" className="text-decoration-none fs-17 text-dark">Login</Link> {/* Use Link here */}
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-6 col-xl-2">
                        <h3 className="text-blue">Legal</h3>
                        <ul className="list-unstyled mt-4">
                            <li className="my-2">
                                <a href="#" className="text-decoration-none fs-17 text-dark">Privacy Policy</a>
                            </li>
                            <li className="my-2">
                                <a href="#" className="text-decoration-none fs-17 text-dark">Use of Terms</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-6 col-xl-4">
                        <h3 className="text-blue">Help Center</h3>
                        <p className="fs-17 mt-3">Contact: <a href="mailto:support@resumebuilder.com" className="text-decoration-none text-blue">support@resumebuilder.com</a></p>
                    </div>
                </div>
            </div>

            <div className="container-fluid copyright-text pt-4 pb-3">
                <p className="text-center fw-3">&copy; 2024 Resume-Builder. All rights reserved</p>
            </div>
        </footer>
    );
};

export default FooterComponent;
