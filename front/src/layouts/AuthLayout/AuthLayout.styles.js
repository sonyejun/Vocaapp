import styled from 'styled-components';
import { getColor } from '../../utils/themeUtils';

export const AuthLayoutWrapper = styled.div`
    height: 100vh;
    background-image: ${getColor('gradient')};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`;