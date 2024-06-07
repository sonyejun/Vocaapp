import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import { FolderAddBtn, FolderBox } from './Folderboard.styles';
import { fetchData } from '../../services/api';
import CardList from './CardList';

const Folderboard = React.memo(() => {
    const [folderData, setFolderData] = useState(null);

    useEffect(() => {
        console.log('folder rendered');

        const fetchFodlerboardData = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const response = await fetchData('/folder/list', jwtToken);

                console.log(response)

                setFolderData(response)
            } catch (error) {
                console.error('Error fetching words data:', error);
            }
        };

        fetchFodlerboardData();
    }, []);

    return (
        <DashboardLayout title={'Folder'}>
            <FolderBox className="DashboardLayOutInnerBox">
                <div className='buttonBox'>
                    <FolderAddBtn>Add Folder</FolderAddBtn>
                </div>
                {folderData && <CardList folderData={folderData} />}
            </FolderBox>
        </DashboardLayout>
    )
});

export default Folderboard;