import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logout');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <header className="header">
            <Navbar expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#">
                        <FontAwesomeIcon icon={faFileInvoice} className="me-2" />
                        <span className="navbar-brand-text">Resume</span> Builder
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarContent" />
                    <Navbar.Collapse id="navbarContent">
                        <Nav className="ms-auto">
                            <Nav.Link href="#basic" className="me-3">Basic Resume</Nav.Link>
                            <Nav.Link href="#college" className="me-3">College Resume</Nav.Link>
                            <Nav.Link onClick={() => navigate('/about')} className="me-3">About Us</Nav.Link>
                        </Nav>
                        <div className="user-info">
                            <div className="user-circle">
                                {loggedInUser?.charAt(0)?.toUpperCase()}
                            </div>
                            <div className="user-name">
                                {loggedInUser}
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="primary"
                            className="text-dark ms-lg-4 px-4 fs-18 mt-3 mt-lg-0"
                        >
                            Logout
                        </Button>
                        <ToastContainer />
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="header-banner d-flex">
                <div className="banner-content d-flex align-items-center justify-content-center flex-grow-1">
                    <div className="text-center">
                        <h1 className="text-uppercase text-blue fw-6 lh-17 display-5">
                            The Best Online Resume Builder
                        </h1>
                        <p className="text-grey fs-4 mt-3 mb-5">Easily create the perfect resume for any job using our best-in-class resume builder platform.</p>
                        <Button
                            onClick={() => navigate('/Body')}
                            className="btn btn-lg text-capitalize btn-primary btn-banner fs-4">  Create My Resume </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
