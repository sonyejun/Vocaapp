import React from 'react';
import { RecentlyFolderBox } from './Dashboard.styles';
import FolderSmailIcon1 from '../../assets/images/dashboard/folderSmail1.png';
import FolderSmailIcon2 from '../../assets/images/dashboard/folderSmail2.png';

const RecentlyFolder = React.memo( () => {
    return (
        <RecentlyFolderBox className="gridItems">
            <div className="subTitle">Recently Folder List</div>
            <ul>
                <li>
                    <img src={FolderSmailIcon1} alt="folder icon1" />
                    <div className='folderInfoBox'>
                        <span className="folderInfoName">folder 1</span>
                        <span className="folderInfoCount">Word 30</span>
                    </div>
                </li>
                <li>
                    <img src={FolderSmailIcon1} alt="folder icon1" />
                    <div className='folderInfoBox'>
                        <span className="folderInfoName">folder 1</span>
                        <span className="folderInfoCount">Word 30</span>
                    </div>
                </li>
                <li>
                    <img src={FolderSmailIcon1} alt="folder icon1" />
                    <div className='folderInfoBox'>
                        <span className="folderInfoName">folder 1</span>
                        <span className="folderInfoCount">Word 30</span>
                    </div>
                </li>
            </ul>
        </RecentlyFolderBox>
    )
});

export default RecentlyFolder;