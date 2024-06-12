import styled from "styled-components";
import { getColor, getFontSize } from "../../utils/themeUtils";

export const DashboardContainer = styled.div`
    background: ${getColor('gradient')};
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    overflow: hidden;
`
export const Main = styled.main`
    flex: 1;
    height: 100%;
    background: #F7F7F7;
    border-radius: 10px 0 0 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    transition: translate 0.5s linear;
    animation: ${props => props.$modalOpen ? 'none' : 'slide-in 0.7s'};

    padding: 72px 0 72px;

    @keyframes slide-in {
        from {
            transform: translateX(100%);
        }
        to {
            ttransform: translateX(0%);
        }
    }

    .mainInnerBox {
        min-width: 1180px;
        max-width: calc(100% - 330px);
        height: 100%;
        margin: 0 auto;
        padding: 0 20px;

        .dashboardLayOutInnerBox {
            height: calc(100% - (2.25rem + 20px));
            margin-top: 20px;
            overflow: hidden;
        }
    }
`;

export const PageTitle = styled.h1`
    font-size: ${getFontSize('xl3')};
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`