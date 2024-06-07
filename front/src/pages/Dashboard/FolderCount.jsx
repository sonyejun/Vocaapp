import React from "react";
import { FolderCounBtn, FolderCountBox } from "./Dashboard.styles";
import FolderBigIcon from '../../assets/images/dashboard/folderBig.png';

const FolderCount = React.memo(({totalFolders}) => {
    return (
        <FolderCountBox className="gridItems">
            <div className="topBox">
                <img src={FolderBigIcon} alt="Total Folder icon" />
                <div className="countBox">
                    <div className="countBoxTitle">Total Folders</div>
                    <div className="countBoxValue">{totalFolders}</div>
                </div>
            </div>
            <FolderCounBtn to="/folder">Add a folder</FolderCounBtn>
        </FolderCountBox>
    );
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.totalFolders) === JSON.stringify(nextProps.totalFolders);
});

export default FolderCount;