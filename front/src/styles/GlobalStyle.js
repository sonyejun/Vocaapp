import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-family: 'Noto Sans', sans-serif;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.text};
    }

    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    textarea, input {
        font-family: 'Noto Sans', sans-serif;
        color: ${({ theme }) => theme.colors.text};
        &::placeholder {
            color: ${({theme}) => theme.colors.gray_c};
        }
    }

    button {
        background: none;
        border: none;
        padding: 0;
        font: inherit; 
        color: inherit;
        cursor: pointer;
      }
`;

export default GlobalStyle;
