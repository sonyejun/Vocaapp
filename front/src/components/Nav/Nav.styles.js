import styled, {css} from "styled-components";
import { NavLink as RouterNavLink} from "react-router-dom";
import { getFontSize, getColor } from '../../utils/themeUtils';

export const NavBox = styled.nav`
    display: inline-block;
    height: calc(100% - 118px);
    padding: 0 5px;
    margin-top: 80px;

    ul {
        display: flex;
        flex-direction: column;
        height: 100%;

        li{
            & + li {
                margin-top: 8px;
            }
            &:last-child {
                margin-top: auto;
            }
        }
    }
`;

export const StyledNavLink = styled(RouterNavLink)`
    display: flex;
    align-items: center;
    padding: 16px 28px;
    border-radius: 100px;
    color: #fff;
    font-size: ${getFontSize('md')};

    &.active {
        outline: 1px solid #fff;
        font-weight: bold;
    }

    &:hover .text {
        text-decoration: underline;
    }

    .text {
        margin-left: 8px;
    }

    .icon {
        display: block;
        width: 1rem;
        height: 1rem;
        background: url(${props => props.icon}) no-repeat 0 0 / cover;
    }
`;

export const Logout = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 28px;
    width: 178px;
    color: ${getColor('primary')};
    background: #fff;
    font-size: ${getFontSize('md')};
    border-radius: 100px;
    
    &:hover .text {
        text-decoration: underline;
    }

    .icon {
        display: block;
        width: 1rem;
        height: 1rem;
        background: url(${props => props.$icon}) no-repeat 0 0 / contain;
    }

    .text {
        margin-left: 8px;
    }
`