import React, {useState} from 'react';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {FormBlock, FormHeading, Divider, FormSubmit, FormLabel, FormInput, FormError} from "../styles/UILibrary";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {loginUser} from "../store/actions/AuthActionCreators";

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
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isAuth, error} = useAppSelector(state => state.auth);

    const formHandler = async (e: any) => {
        e.preventDefault();
        await dispatch(loginUser(email, password));
        setEmail('');
        setPassword('');
        if (isAuth) {
            navigate('/profile');
        }
    }

    return (
        <FormBlock>
            <FormHeading>Log In</FormHeading>
            <Divider/>
            <form onSubmit={(e) => formHandler(e)}>
                {error && <FormError>*{error}</FormError>}
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
