import React from 'react';
import FolderSmailIcon1 from '../../assets/images/dashboard/folderSmail1.png';
import FolderSmailIcon2 from '../../assets/images/dashboard/folderSmail2.png';

const RecentlyFolderItem = React.memo(({icon, folderName, value}) => {
    return (
        <li>
            <img src={icon} alt="folder icon" />
            <span className='folderInfoBox'>
                <span className="folderInfoName">{folderName}</span>
                <span className="folderInfoCount">Word {value}</span>
            </span>
        </li>
    )
});

export default RecentlyFolderItem;