import React from 'react';
import { DashboardContainer, Main, PageTitle } from './DashboardLayout.styles';
import Aside from '../../components/Aside/Aside';


const DashboardLayout = ( { title, children } ) => {
    return (
        <DashboardContainer>
            <Aside />
            <Main>
                <div className='mainInnerBox'>
                    <PageTitle>{ title }</PageTitle>
                    { children }
                </div>
            </Main>
        </DashboardContainer>
    );
};

export default DashboardLayout;