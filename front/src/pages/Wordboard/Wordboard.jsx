import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import { fetchData, deleteData } from '../../services/api';
import { WordBox } from './Wordboard.styles';

import WordCardList from './WordCardList';
import WordCUModal from '../../components/WordCUModal/WordCUModal';
import WordReadModal from '../../components/WordReadModal/WordReadModal';

const Wordboard = React.memo(() => {
    const { folderId } = useParams();
    const navigate = useNavigate();
    const [wordBoardData, setWordBoardData] = useState(null);
    const [sortedWordData, setSortedWordData] = useState(null); // Added: State to hold sorted word data
    const [sortBy, setSortBy] = useState('last'); // State for selected sorting criteria
    const [folderSelectBox, setFolderSelectBox] = useState(null);
    const [wordCUModalOpen, setWordCUModalOpen] = useState(null);
    const [wordReadModalOpen, setWordReadModalOpen] = useState(null);
    const [editId, setEditId] = useState(null);
    const [readId, setReadId] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const checkCUModalOpen = searchParams.get('modal');


    const fetchWordboardData = async (url, token) => {
        try {
            const response = await fetchData(url, token);
            console.log(response)
            setWordBoardData(response);
            folderId ? setFolderSelectBox([response.folder]) : setFolderSelectBox(response.folders);

        } catch (error) {
            console.error('Error fetching folder data:', error);
            if (error.response.data === 'Folder not found') {
                alert('Please create the folder first.');
                navigate('/folder?modal=true');
            }
        }
    };

    useEffect(() => {
        setWordCUModalOpen(checkCUModalOpen);

        const apiUrl = folderId ? `/word/list/${folderId}` : '/word/list';
        const jwtToken = localStorage.getItem('jwtToken');
        
        fetchWordboardData(apiUrl, jwtToken);
    }, [folderId]);

    useEffect(() => {
        // Update sorted data based on selected sorting criteria
        if (wordBoardData && wordBoardData.words) {
            let sortedData = [...wordBoardData.words]; // Make a copy to avoid mutating the original data
            if (sortBy === 'last') {
                sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by most recent createdAt
            } else if (sortBy === 'oldest') {
                sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by oldest createdAt
            } else if (sortBy === 'memorized') {
                sortedData = sortedData.filter(data => data.memorized); // Filtering the data to include only items where 'memorized' is true.
            } else if (sortBy === 'unmemorized') {
                sortedData = sortedData.filter(data => !data.memorized); // Filtering the data to include only items where 'memorized' is false.
            }
            setSortedWordData(sortedData); // Update state with sorted data
        }
    }, [sortBy, wordBoardData]);
    
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const toggleCreateModal = useCallback(() => {
        setEditId(null);
        setWordCUModalOpen(!wordCUModalOpen);
    },[]);

    const wordEdit = useCallback ( (e) => {
        console.log(e.target.value)
        e.stopPropagation();
        setEditId(e.target.value);
        setWordCUModalOpen(!wordCUModalOpen);
    },[]);

    const wordRemove = useCallback( async (e) => {
        e.stopPropagation();
        try {
            const wordId = e.target.value;
            const wordName = e.target.dataset.name;
            const confirmDelete = window.confirm(`Are you sure you want to delete the word "${wordName}"?`);
            
            if (confirmDelete) {
                const jwtToken = localStorage.getItem('jwtToken');
                const response = await deleteData(`/word/${wordId}`, jwtToken);
                console.log(wordBoardData.words);
                const newWordData = wordBoardData.words.filter(word => word.id !== Number(wordId));
                setWordBoardData(prevWordBoardData => ({
                    ...prevWordBoardData,
                    words: newWordData
                }));
            };

        } catch (error) {
            console.error('Error remove folder data:', error);
        }
    },[wordBoardData]);

    const toggleReadModal = useCallback((wordId) => {
        setReadId(wordId)
        setWordReadModalOpen(!wordReadModalOpen);
    },[]);

    return (
        <DashboardLayout title={folderId && wordBoardData ? wordBoardData.folder.foldername : 'All Words'}>
            <WordBox className="dashboardLayOutInnerBox">
                <div className='topBox'>
                    <div className="subText">{folderId && wordBoardData ? wordBoardData.folder.description : 'All the words I have registered'}</div>
                    <div className="buttonBox">
                        <select value={sortBy} onChange={handleSortChange}>
                            <option value="last">Last</option>
                            <option value="oldest">Oldest</option>
                            <option value="memorized">Memorized</option>
                            <option value="unmemorized">Unmemorized</option>
                        </select>
                        <button type="Button" className='listenBtn'>Listen</button>
                        <button type="Button" onClick={toggleCreateModal}>Add Word</button>
                    </div>
                </div>
                { sortedWordData && <WordCardList
                    sortedWordData={sortedWordData}
                    wordEdit={wordEdit}
                    wordRemove={wordRemove}
                    toggleReadModal={toggleReadModal}
                /> }
            </WordBox>
            {wordCUModalOpen && <WordCUModal
                wordCUModalOpen={wordCUModalOpen}
                setWordCUModalOpen={setWordCUModalOpen}
                folderSelectBox={folderSelectBox}
                wordBoardData={wordBoardData}
                setWordBoardData={setWordBoardData}
                editId={editId}
                setEditId={setEditId}
            />}
            {wordReadModalOpen && <WordReadModal
                setWordReadModalOpen={setWordReadModalOpen}
                wordBoardData={wordBoardData}
                setWordBoardData={setWordBoardData}
                readId={readId}
            />}
        </DashboardLayout>
    );
});

export default Wordboard;