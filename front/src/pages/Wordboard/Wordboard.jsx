import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import { fetchData } from '../../services/api';

const Wordboard = React.memo(() => {
    const { folderId } = useParams();
    
    const fetchWordboardData = async (url, token) => {
        try {
            const response = await fetchData(url, token);
            console.log(response);
        } catch (error) {
            console.error('Error fetching folder data:', error);
        }
    };

    useEffect(() => {
        const apiUrl = folderId ? `/word/list/${folderId}` : '/word/list';
        const jwtToken = localStorage.getItem('jwtToken');
        console.log(apiUrl)
        fetchWordboardData(apiUrl, jwtToken);
    }, [folderId]);

    


    return (
        <DashboardLayout title={'Word'}>

        </DashboardLayout>
    );
});

export default Wordboard;
