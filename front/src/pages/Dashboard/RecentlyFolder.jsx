import React from 'react';
import { RecentlyFolderBox } from './Dashboard.styles';
import FolderSmailIcon1 from '../../assets/images/dashboard/folderSmail1.png';
import FolderSmailIcon2 from '../../assets/images/dashboard/folderSmail2.png';
import RecentlyFolderItem from './RecentlyFolderItem';

const RecentlyFolder = React.memo( ({recentFolders}) => {
    console.log(1111)
    console.log(recentFolders)
    return (
        <RecentlyFolderBox className="gridItems">
            <div className="subTitle">Recently Folder List</div>
            <ul>
                {recentFolders.map((recentFolder, index) => {
                    const icon = index % 2 === 0 ? FolderSmailIcon2 : FolderSmailIcon1;
                    return <RecentlyFolderItem key={recentFolder.folderId} icon={icon} folderName={recentFolder.foldername} value={recentFolder.wordCount} />;
                })}
            </ul>
        </RecentlyFolderBox>
    )
}, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.recentFolders) === JSON.stringify(nextProps.recentFolders);
});

export default RecentlyFolder;