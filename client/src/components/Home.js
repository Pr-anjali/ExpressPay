import React, {useState, useEffect} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

   // const [user, loading, error] = useAuthState(auth);
  
 // console.log(error);
  const navigate = useNavigate();
  
    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            // console.log(data);
            setUserName(data.name);
            setShow(true);

        } catch (err) {
            console.log(err);
            console.log("Hello")
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);
    return (
        <>
            <div className="home-page">
                <div className="home-div">
                    <p className="pt-5">WELCOME</p>
                    <h1>{userName}</h1>
                    <h2> { show ? 'Happy, to see you back' :  'We Are The MERN Developer' }</h2>
                </div>
            </div>
            
        </>
    )
}

export default Home
