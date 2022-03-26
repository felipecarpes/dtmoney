import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --blue: #5429CC;
        --red: #E62E4D;
        --green: #33CC95;

        --blue-light: #6933FF;

        --text-title: #363F5F;
        --text-body: #969CB3;

        --shape: #FFFFFF;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        /* font-size: 16px (desktop) */
        
        @media (max-width: 1080px) {
            font-size: 93.75%; /* 16px * 0.9375 = 15px */
        }
        
        @media (max-width: 720px) {
            font-size: 87.5%; /* 16px * 0.875 = 14px */
        }

        /* REM - 1rem = font-size da pagina */
        /* porcentagem para que mude o tamanho da fonte, não fique fixa conforme tamanho da tela */
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;