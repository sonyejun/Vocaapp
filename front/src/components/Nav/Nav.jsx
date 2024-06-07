import React, { useCallback } from 'react';
import { NavBox, StyledNavLink, Logout } from './Nav.styles';
import DashboardIcon from '../../assets/images/nav_dashboard.png';
import FolderIcon from '../../assets/images/nav_folder.png';
import WordIcon from '../../assets/images/nav_word.png';
import LogoutIcon from '../../assets/images/logout.png';
import { deleteData } from '../../services/api';
import { useAuth } from '../../contexts/AuthProvider';

const Nav = React.memo(() => {
    const { setIsLoggedIn } = useAuth();

    const logoutButton = useCallback(async (e) => {
        try {
            const data = await deleteData('/auth/logout');

            localStorage.clear();
            setIsLoggedIn(false);

        } catch (err) {
            console.log(err);
        };
    },[]);

    return (
        <NavBox>
            <ul>
                <li>
                    <StyledNavLink exact="true" to="/" icon={DashboardIcon}>
                        <span className='icon'></span>
                        <span className='text'>Dashboard</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/folder" icon={FolderIcon}>
                        <span className='icon'></span>
                        <span className='text'>Folder</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/word" icon={WordIcon}>
                        <span className='icon'></span>
                        <span className='text'>Word</span>
                    </StyledNavLink>
                </li>
                <li>
                    <Logout type='button' $icon={LogoutIcon} onClick={logoutButton} >
                        <span className="icon"></span>
                        <span className="text">Logout</span>
                    </Logout>
                </li>
            </ul>
        </NavBox>
    );
});

export default Nav;


