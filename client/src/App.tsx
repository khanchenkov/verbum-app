import React, {useEffect} from 'react';
import GlobalStyles from "./styles/GlobalStyles";
import Pages from "./pages";
import {colors} from "./styles/UILibrary";
import {ThemeProvider} from "styled-components";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {refresh} from "./store/actions/AuthActionCreators";
import {authSlice} from "./store/reducers/AuthSlice";
import {getUserBooks} from "./store/actions/BookActionCreators";
import {getUserInfo} from "./store/actions/UserActionCreators";

const App = () => {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(state => state.auth.isDarkMode);

    useEffect(() => {

        if (localStorage.getItem("token")) {
            dispatch(getUserInfo());
            dispatch(getUserBooks());
            dispatch(refresh());
        }

        dispatch(authSlice.actions.clearAuthErrors());
    }, [dispatch]);
    useEffect(() => {
        const reloadTimer = setTimeout(() => {
            if (localStorage.getItem("token")) {
                dispatch(refresh());
                window.location.reload();
            }
        }, 1000 * 60 * 29)
        return () => clearTimeout(reloadTimer);
    }, []);

    return (
      <ThemeProvider theme={isDarkMode ? colors.darkMode : colors.lightMode}>
          <GlobalStyles/>
          <Pages/>
      </ThemeProvider>
    );
};

export default App;
