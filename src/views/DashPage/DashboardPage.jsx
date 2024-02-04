import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {

    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn) {
            navigate("/");
        }
    }, []);

    return (
        <h1>This is the Dashbaord</h1>
    )
}

export default DashboardPage;