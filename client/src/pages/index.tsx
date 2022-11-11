import React, {FC, useRef} from "react";
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
import LibraryPage from "./LibraryPage";
import BookReader from "./BookReader";
import {useAppSelector} from "../hooks/redux";
import Loading from "../components/Loading";

const PrivateRoutes: FC<PrivateRoutesProps> = ({isAuth}) => isAuth ? <Outlet/> : <Navigate to="/"/>;

const Pages = () => {
    const currentBook = useAppSelector(state => state.book.currentBook);
    const {isAuth, isLoading: isLoadingAuth} = useAppSelector(state => state.auth);
    const isLoadingUser = useAppSelector(state => state.user.isLoading);
    const isLoadingBook = useAppSelector(state => state.book.isLoading);
    const anyDataLoading = isLoadingUser || isLoadingAuth || isLoadingBook;
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <Router>
            {anyDataLoading && <Loading/>}
            <Header isAuth={isAuth}/>
            <Container ref={containerRef}>
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
                        <Route path="/settings" element={<SettingsPage/>}/>
                        <Route path="/library" element={<LibraryPage/>}/>
                        {currentBook && <Route path="/reader" element={<BookReader containerRef={containerRef}/>}/>}
                        <Route path="*" element={<Navigate to="/profile" replace/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </Container>
        </Router>
    );
};

export default Pages;
