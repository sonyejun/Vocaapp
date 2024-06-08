import React, { useEffect, useState } from 'react';
import { DashboardContainer, Main, PageTitle } from './DashboardLayout.styles';
import Aside from '../../components/Aside/Aside';
import { useLocation } from 'react-router-dom';


const DashboardLayout = ( { title, children, modalOpen } ) => {
    return (
        <DashboardContainer>
            <Aside />
            <Main $modalOpen={modalOpen}>
                <div className='mainInnerBox'>
                    <PageTitle>{ title }</PageTitle>
                    { children }
                </div>
            </Main>
        </DashboardContainer>
    );
};

export default DashboardLayout;