// LandingPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        {/* <title>Landing Page - Start Bootstrap Theme</title> */}
        {/* <!-- Favicon--> */}
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        {/* <!-- Bootstrap icons--> */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" type="text/css" />
        {/* <!-- Google fonts--> */}
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css" />
        {/* <!-- Core theme CSS (includes Bootstrap)--> */}
        <link href="css/styles.css" rel="stylesheet" />
    </head>
    <body>
        {/* <!-- Navigation--> */}
        <Navbar />
        {/* <!-- Masthead--> */}
        <header class="masthead">
            <div class="container position-relative">
                <div class="row justify-content-center">
                    <div class="col-xl-6">
                        <div class="text-center text-white">
                            {/* <!-- Page heading--> */}
                            <h1 class="mb-5"> Take control, achieve balance, and thrive on the path to lasting financial wellness!</h1>                            
                        </div>
                    </div>
                </div>
            </div>
        </header>
        {/* <!-- Features--> */}
        <section class="features-icons bg-light text-center" id='features'>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex"><i class="bi-currency-dollar m-auto text-primary"></i></div>
                            <h3>Track Finances Easily</h3>
                            <p class="lead mb-0">Effortlessly manage your income and expenses.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div class="features-icons-icon d-flex"><i class="bi-bar-chart-line m-auto text-primary"></i></div>
                            <h3>Insightful Visuals</h3>
                            <p class="lead mb-0">Harness the power of data visualization for smarter financial decisions.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                            <div class="features-icons-icon d-flex"><i class="bi-phone m-auto text-primary"></i></div>
                            <h3>Anywhere Access</h3>
                            <p class="lead mb-0">Experience financial freedom on-the-go with our mobile-friendly design.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/* <!-- Testimonials--> */}
        <section class="testimonials text-center bg-light" id='testimonials'>
            <div class="container">
                <h2 class="mb-5">What people are saying...</h2>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img class="img-fluid rounded-circle mb-3"  src="assets/img/Scrooge McDuck.jpg" alt="..." />
                            <h5>Scrooge M.</h5>
                            <p class="font-weight-light mb-0">"Thanks to FinWell, I've undergone a financial transformation. The app guided me to a more balanced and fulfilling life, showing me there's more to wealth than just hoarding coins. FinWell, you've made me see the light!"</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img class="img-fluid rounded-circle mb-3" src="assets/img/Mr Krabs.jpg" alt="..." />
                            <h5>Eugene K.</h5>
                            <p class="font-weight-light mb-0">"FinWell turned me from a coin-counting maniac into a budgeting master! With the app's financial insights, I'm now planning a well-deserved vacation to Jellyfish Fields. Thanks, FinWell!"</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img class="img-fluid rounded-circle mb-3" src="assets/img/Montgomery Burns.jpeg" alt="..." />
                            <h5>Montgomery B.</h5>
                            <p class="font-weight-light mb-0">"FinWell guided me to diversify my investments and discover the joy of philanthropy. I've transformed from a cold-hearted mogul to a responsible steward of my fortune. FinWell, you've changed my financial game!"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- Signup--> */}
        
        <SignUpForm />
        
        {/* <!-- Footer--> */}
        <footer class="footer bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 h-100 text-center text-lg-start my-auto">
                        <ul class="list-inline mb-2">
                            <li class="list-inline-item"><a href="#!">About</a></li>
                            <li class="list-inline-item">⋅</li>
                            <li class="list-inline-item"><a href="#!">Contact</a></li>
                            <li class="list-inline-item">⋅</li>
                            <li class="list-inline-item"><a href="#!">Terms of Use</a></li>
                            <li class="list-inline-item">⋅</li>
                            <li class="list-inline-item"><a href="#!">Privacy Policy</a></li>
                        </ul>
                        <p class="text-muted small mb-4 mb-lg-0">&copy; FinWell 2023. All Rights Reserved.</p>
                    </div>
                    <div class="col-lg-6 h-100 text-center text-lg-end my-auto">
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item me-4">
                                <a href="#!"><i class="bi-facebook fs-3"></i></a>
                            </li>
                            <li class="list-inline-item me-4">
                                <a href="#!"><i class="bi-twitter fs-3"></i></a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#!"><i class="bi-instagram fs-3"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        {/* <!-- Bootstrap core JS--> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        {/* <!-- Core theme JS--> */}
        <script src="js/scripts.js"></script>

        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
    </body>
    </div>
  );
};

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const handleLoginClick = () => setShowLoginModal(true);
    const handleLoginClose = () => setShowLoginModal(false);

    
    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Request payload:', { email, password });
        
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { email, password });
            // Handle the response (e.g., check for successful login)
            
            const token = response.data.token;
            // Save the token in localStorage
            localStorage.setItem('authToken', token);

            console.log(response.data.token); // Log the server response

            // Go to dashboard
            // Redirect the user to the dashboard after successful login
            navigate('/portal/dashboard');
        } catch (error) {
            // Handle login error
            console.error('Login failed', error);
        }

        // Clear the form fields when submitting the form
        setEmail('');
        setPassword('');
        // Close the modal after handling login logic
        setShowLoginModal(false);
    };


    const handleSignUpButtonInLoginModal = () => {
        document.getElementById('signup').scrollIntoView({ behavior: 'smooth' });
        setShowLoginModal(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src="logo512.png" alt="Logo" height="30" className="d-inline-block align-top" />
                        FinWell
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded={!isNavCollapsed ? 'true' : 'false'} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <a className="nav-link" href="#features">Features</a>
                            <a className="nav-link" href="#testimonials">Testimonials</a>
                            <a className="nav-link" href="#signup">Sign Up</a>
                        </div>
                        <button className="btn btn-primary login-btn" id="loginButton" onClick={handleLoginClick}>Log In</button>
                    </div>
                </div>
            </nav>

            {showLoginModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Log In</h5>
                                <button type="button" className="btn-close" onClick={handleLoginClose}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleLoginFormSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Log In</button>
                                    <button type="button" className="btn btn-link" onClick={handleSignUpButtonInLoginModal}>Sign Up Instead</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Check if the password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match, Try again.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/create_user/', formData);
            console.log(response.data);

            // Scroll smoothly to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // run login modal
            document.getElementById('loginButton').click();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" id='signup'>
            <form onSubmit={handleFormSubmit} className="p-3" style={{ width: '700px' }}>
                <h2 className="mb-4 text-center">Sign Up</h2>
                <div className="form-floating mb-3">
                    <input type="text" name="username" className="form-control" id="floatingUsername" placeholder="Username" onChange={handleInputChange} required />
                    <label htmlFor="floatingUsername">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" name="email" className="form-control" id="floatingEmail" placeholder="name@example.com" onChange={handleInputChange} required />
                    <label htmlFor="floatingEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleInputChange} required />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" name="confirmPassword" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" onChange={handleInputChange} required />
                    <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                </div>
                {error && <div className="text-danger p-2">{error}</div>}
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};
  


export default LandingPage;
