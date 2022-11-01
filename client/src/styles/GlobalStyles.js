import normalize from 'normalize.css';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    ${normalize};
    
    *, *:before, *:after {
        box-sizing: border-box;
    }
    
    body, html {
        height: 100%;
        margin: 0;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Roboto Slab', Roboto, sans-serif;
        background-color: ${(props) => props.theme.main};
        line-height: 1.4;
    }
    
    a:link, a:visited {
        color: #0077cc;
    }
    a:hover, a:focus {
        color: #004499;
    }
    code, pre {
        max-width: 100%;
    }
    img {
      user-select: none;
    }
`;