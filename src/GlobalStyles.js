import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    body {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0D5190;
    }
`