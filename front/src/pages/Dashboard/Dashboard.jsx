import React, {useEffect, useState, useCallback} from 'react';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import { DashboardBox } from './Dashboard.styles';
import { fetchData } from '../../services/api';
import WordsCount from './WordsCount';
import ResiterWord from './RegisterWord';
import WordsLink from './WordsLink';
import FolderCount from './FolderCount';
import RecentlyFolder from './RecentlyFolder';

const Dashboard = React.memo(() => {
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log('Dashboard rendered', data);

        const fetchDashboardData = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                const response = await fetchData('/dashboard', jwtToken);
                setData(response);

                console.log(response)
            } catch (error) {
                console.error('Error fetching words data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <DashboardLayout title={'Dashboard'}>
            <DashboardBox className='DashboardLayOutInnerBox'>
                {data && <WordsCount words={data.words} />}
                {data && <ResiterWord yesterdayWords={data.yesterdayWords} />}
                <WordsLink />
                {data && <FolderCount totalFolders={data.totalFolders} /> }
                {data && <RecentlyFolder recentFolders={data.recentFolders} /> }
            </DashboardBox>
        </DashboardLayout>
    );
});

export default Dashboard;