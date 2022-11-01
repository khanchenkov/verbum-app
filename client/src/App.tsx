import React, {useState} from 'react';
import GlobalStyles from "./styles/GlobalStyles";
import Pages from "./pages";
import {colors} from "./styles/UILibrary";
import {ThemeProvider} from "styled-components";


const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
      <ThemeProvider theme={darkTheme ? colors.darkMode : colors.lightMode}>
          <GlobalStyles/>
          <Pages/>
      </ThemeProvider>
    );
};

export default App;
