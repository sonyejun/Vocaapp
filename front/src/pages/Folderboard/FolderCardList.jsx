import React,{ uesState } from 'react';

import EditIon from '../../assets/images/edit.png';
import DeleteIcon from '../../assets/images/delete.png';

import { CardListBox, CardListItem } from './Folderboard.styles';

const randomColor = () => {
    const colors = ["#4ea8e5", "#a84ee5", "#4ee5a8", "#e54ea8", "#5e4ea8", "#4ea85e", "#e5a84e", "#a8e54e", "#e54e5e", "#e5a64e"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const FolderCardList = React.memo(({folderData, folderRemove, folderEdit, folderLink}) => {

    return (
        <CardListBox className="cardListBox">
            {folderData.map((folder, index) => {
                const radomcolor = randomColor();
                return (
                    <CardListItem key={folder.folderId} className="card" role="button" onClick={() => folderLink(folder.folderId)} $radomcolor={radomcolor} $EditIon={EditIon} $DeleteIcon={DeleteIcon}>
                        <div className="cardHeader">
                            <div className="cardName">{folder.foldername}</div>
                            <div className="buttonBox">
                                <button type="button" value={folder.folderId} onClick={folderEdit}></button>
                                <button type="button" value={folder.folderId} onClick={folderRemove} data-name={folder.foldername}></button>
                            </div>
                        </div>
                        <div className="cardBody">
                            <div className="description">{folder.description}</div>
                            <div className="wordCountBox">
                                <span>Total Words: {folder.totalWordCount}</span>
                                <span>Memorized Words: {folder.memorizedCount}</span>
                            </div>
                        </div>
                        <div className="cardFooder"></div>
                    </CardListItem>
                )
            })}
        </CardListBox>
    );
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.folderData) === JSON.stringify(nextProps.folderData);
});

export default FolderCardList;