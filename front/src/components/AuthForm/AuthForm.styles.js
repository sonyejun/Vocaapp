import styled from 'styled-components';

import { getSize, getColor, getFontSize, getSpacing } from '../../utils/themeUtils';

export const AuthFormWrapper = styled.div`
    background-color: #fff;
    border-radius: ${getSize('xxs')};
    box-shadow: 0, 4, 10, #D3EBFF;
    padding: 50px 300px;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: ${getFontSize('xl3')};
    color: ${getColor('primary')};
`

export const SubTitle = styled.div`
    color: ${getColor('gray')};
    margin-top: 6px;
`

export const LinkText = styled.div`
    margin-top: 16px;
    font-size: 0.9rem;
    color: ${getColor('gray')};
    font-size: ${getFontSize('sm')};

    a {
        font-size: ${getFontSize('base')};
        color: ${getColor('primary')};
        &:hover{
            text-decoration: underline;
        }
    }
`;

export const FormBox = styled.form`
    margin-top: 30px;

    div {
        position: relative;

        & + div {
            margin-top: 16px;
        }

        input {
            width: 380px;
            padding: 0.875rem 2.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding-left: 3rem;
            font-size: ${getFontSize('md')}
        }
        
        .icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            font-size: ${getFontSize('md')};
            width: 20px;
            height: 20px;

            img {
                width: 100%;
            }
        }
    }

    button {
        margin-top: 16px;
    }
`;