import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Signup from './components/SignUp';
import DetailsFillingPage from './components/DetailsFillComponents/DetailsFillingPage';
import MyResume from './components/ResumeDisplay/MyResume';
import AboutUs from './components/AboutUs/AboutUs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/ReactToastify.css';
import RefreshHandler from './RefreshHandler';
import EditTemplate from './components/EditTemplate';
import Body from './components/Body/Body';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    return (
        <div className='App'>
            <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/home' element={<PrivateRoute element={<HomePage />} />} />
                <Route path="/detailsfillingpage/*" element={<DetailsFillingPage />} />
                <Route path="/myresume" element={<MyResume />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path="/edit-template/:templateId" element={<EditTemplate />} />
                <Route path="/body" element={<Body />} />
            </Routes>
        </div>
    );
};

export default App;
