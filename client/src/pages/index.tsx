import React, {FC} from "react";
import {PrivateRoutesProps} from "../types/IProps";
import {Container} from "../styles/UILibrary";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";
import Header from "../components/Header";
import GreetingsPage from "./GreetingsPage";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
import ResetPasswordPage from "./ResetPasswordPage";
import ForgotPage from "./ForgotPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import {useAppSelector} from "../hooks/redux";
import Loading from "../components/Loading";

const Pages = () => {
    const {isAuth, isLoading: isLoadingAuth} = useAppSelector(state => state.auth);
    const isLoadingUser = useAppSelector(state => state.user.isLoading);
    const anyDataLoading = isLoadingUser || isLoadingAuth;

    return (
        <Router>
            {anyDataLoading && <Loading/>}
            <Header isAuth={isAuth}/>
            <Container>
                <Routes>
                    {
                        !isAuth &&
                        <>
                            <Route path="/" element={<GreetingsPage/>}/>
                            <Route path="/signup" element={<SignUpPage/>}/>
                            <Route path="/login" element={<LogInPage/>}/>
                            <Route path="/forgot" element={<ForgotPage/>}/>
                            <Route path="/reset/:link" element={<ResetPasswordPage/>}/>
                        </>
                    }
                    <Route element={<PrivateRoutes isAuth={isAuth}/>}>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/settings" element={<SettingsPage />}/>
                        {/*<Route path="/library" element={<LibraryPage />}/>*/}
                        {/*<Route path="/reader" element={<BookReader/>} />*/}
                        <Route path="*" element={<Navigate to="/profile" replace/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </Container>
        </Router>
    );
};

const PrivateRoutes: FC<PrivateRoutesProps> = ({isAuth}) => {
    return(
        isAuth ? <Outlet/> : <Navigate to="/"/>
    );
};

export default Pages;
