import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';

const Folder = () => {
    
    return (
        <DashboardLayout>
            <div>folder</div>
            <Link to="/">Sign up</Link>
        </DashboardLayout>
    )
};

export default Folder;