import React, {useEffect,useState} from 'react';
import CarouselComponent from './ControlledCarousel';
import Footer from './Footer';
import Header from './Header';
import {useNavigate} from 'react-router-dom';
import {handleError, handleSuccess} from '../utils';
import { ToastContainer } from 'react-toastify';
import Trail from './trail';
import Body from './Body/Body';
import Home from './HomePage/Home';

function HomePage(){
    // const [loggedInUser,setLogeedInUser]=useState('');
    const [products,setProducts]=useState('');
    // const navigate=useNavigate();
    // useEffect(()=>{
    //     setLogeedInUser(localStorage.getItem('loggedInUser'))
    // },[])

    // const handleLogout=(e)=>{
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('loggedInUser');
    //     handleSuccess('User Logout');
    //     setTimeout(()=>{
    //         navigate('/login');
    //     },1000)
    // }

    const fetchProducts=async()=>{
        try{
            const url="http://localhost:5000/products";
            const headers={
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            }
            const response=await fetch(url,headers);
            const result=await response.json();
            console.log(result);
            setProducts(result);
        }
        catch(err){
            handleError(err);
        }
    }
    useEffect(()=>{
        fetchProducts()
    },[])
    return (
        <>
            <Header />
            
            <main>
                <CarouselComponent />
                {/* <Home/> */}
            </main>
            <Footer />  
            {/* <Trail/>
            <Body/>  */}
        </>
    );
};

export default HomePage;
