import React, {useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {FormBlock, FormHeading, Divider, FormSubmit, FormLabel, FormInput, FormError} from "../styles/UILibrary";
import Loading from "../components/Loading";

const ForgotLink = styled(Link)`
  color: ${(props) => props.theme.secondary} !important;
  text-decoration: underline;
  display: block;
  text-align: center;
  cursor: pointer;
  &:hover{
    color: ${(props) => props.theme.darkSecondary} !important;
  }
`;

const LogInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isLoading = false;
    const error = '';
    const clientError = '';

    const formHandler = async (e: any) => {
        e.preventDefault();
        // if (isLoginPage) {
        //     await dispatch(loginUser(email, password));
        // } else {
        //     if (password === password2) {
        //         await dispatch(registerUser(email, password));
        //     } else {
        //         setClientError('Passwords doesn\'t match.');
        //     }
        // }
        // setEmail('');
        // setPassword('');
        // setPassword2('');
        // if (isAuth) {
        //     navigate('/stats');
        // }
    }

    return (
        <FormBlock>
            {isLoading && <Loading/>}
            <FormHeading>Log In</FormHeading>
            <Divider/>
            <form onSubmit={(e) => formHandler(e)}>
                {error && <FormError>*{error}</FormError>}
                {clientError && <FormError>*{clientError}</FormError>}
                <FormLabel>Email</FormLabel>
                <FormInput
                    required
                    type="email"
                    placeholder="Enter email..."
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    required
                    type="password"
                    placeholder="Enter password..."
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <FormSubmit type="submit">Continue</FormSubmit>
                <ForgotLink to="/forgot">Forgot password?</ForgotLink>
            </form>
        </FormBlock>
    );
};

export default LogInPage;
