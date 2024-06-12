import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import { FolderAddBtn, FolderBox } from './Folderboard.styles';

import { deleteData, fetchData } from '../../services/api';

import FolderCardList from './FolderCardList';
import FolderCUModal from '../../components/FolderCUModal/FolderCUModal';

const Folderboard = React.memo(() => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const checkModalOpen = searchParams.get('modal');

    const [folderData, setFolderData] = useState([]);
    const [folderModalOpen, setFolderModalOpen] = useState(null);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        

        setFolderModalOpen(checkModalOpen);

        console.log('folder rendered');

        const fetchFodlerboardData = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const response = await fetchData('/folder/list', jwtToken);

                console.log(response)

                setFolderData(response)
            } catch (error) {
                console.error('Error fetching folder data:', error);
            }
        };

        fetchFodlerboardData();
    }, []);

    const toggleCreateModal = useCallback(() => {
        setEditId(null);
        setFolderModalOpen(!folderModalOpen);
    },[]);

    const folderEdit = useCallback ( (e) => {
        e.stopPropagation();
        setEditId(e.target.value);
        setFolderModalOpen(!folderModalOpen);
    },[]);

    const folderRemove = useCallback( async (e) => {
        e.stopPropagation();
        try {
            const folderId = e.target.value;
            const folderName = e.target.dataset.name;
            const confirmDelete = window.confirm(`Are you sure you want to delete the folder "${folderName}"?`);
            
            if (confirmDelete) {
                const jwtToken = localStorage.getItem('jwtToken');
                const response = await deleteData(`/folder/${folderId}`, jwtToken);
                const newFolderData = folderData.filter(folder => folder.folderId !== Number(folderId));
                setFolderData(newFolderData);
            };

        } catch (error) {
            console.error('Error remove folder data:', error);
        }
    },[folderData]);

    const folderLink = useCallback (folderId => {
        navigate(`/word/${folderId}`);
    },[]);

   

    return (
        <DashboardLayout title={'Folder'} modalOpen={checkModalOpen}>
            <FolderBox className="dashboardLayOutInnerBox">
                <div className='buttonBox'>
                    <FolderAddBtn type="Button" onClick={toggleCreateModal}>Add Folder</FolderAddBtn>
                </div>
                {folderData && <FolderCardList
                    folderData={folderData}
                    folderRemove={folderRemove}
                    folderEdit={folderEdit}
                    folderLink={folderLink}
                />}
            </FolderBox>
            {folderModalOpen && <FolderCUModal
                setFolderModalOpen={setFolderModalOpen}
                folderData={folderData}
                setFolderData={setFolderData}
                editId={editId}
                setEditId={setEditId}
            />}
        </DashboardLayout>
    );
});

export default Folderboard;