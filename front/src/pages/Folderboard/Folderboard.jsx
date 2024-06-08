import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import { FolderAddBtn, FolderBox } from './Folderboard.styles';
import { deleteData, fetchData } from '../../services/api';
import FolderCardList from './FolderCardList';
import FolderCUModal from '../../components/FolderCUModal/FolderCUModal';
import { useLocation } from 'react-router-dom';

const Folderboard = React.memo(() => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const checkModalOpen = searchParams.get('modal');

    const [folderData, setFolderData] = useState(null);
    const [FolderModalOpen, setFolderModalOpen] = useState(null);
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
        setFolderModalOpen(!FolderModalOpen);
    },[]);

    const folderEdit = useCallback ( (e) => {
        setEditId(e.target.value);
        setFolderModalOpen(!FolderModalOpen);
    },[]);

    const folderRemove = useCallback( async (e) => {
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

   

    return (
        <DashboardLayout title={'Folder'} modalOpen={checkModalOpen}>
            <FolderBox className="DashboardLayOutInnerBox">
                <div className='buttonBox'>
                    <FolderAddBtn type="Button" onClick={toggleCreateModal}>Add Folder</FolderAddBtn>
                </div>
                {folderData && <FolderCardList
                    folderData={folderData}
                    folderRemove={folderRemove}
                    folderEdit={folderEdit}
                />}
            </FolderBox>
            {FolderModalOpen && <FolderCUModal
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