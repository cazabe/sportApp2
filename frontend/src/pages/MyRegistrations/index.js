import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const MyRegistrations = ()=>{
    const [myEvents , setMyEvents] = useState([]);
    const user = localStorage.getItem('user');

    const getMyEvents = async()=>{
        try {
            const response = await api.get('/registration' , { headers: { user: user } });
            console.log(response.data);    
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getMyEvents();
    },[])
return(
    <div>My registration</div>
)
}

export default MyRegistrations