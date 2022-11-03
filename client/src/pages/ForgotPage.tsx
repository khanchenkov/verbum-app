import React, {useState} from 'react';
import styled from "styled-components";
import {FormHeading, FormInput, FormSubmit, Divider, FormError} from "../styles/UILibrary";
import {forgot} from "../store/actions/AuthActionCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useNavigate} from "react-router-dom";

const ForgotPageBlock = styled.div`
  margin-top: 170px;
`;
const ForgotForm = styled.form`
  width: 300px;
  margin: 0 auto;
`;
const TextInfo = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.text};
`;

const ForgotPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLinkSent, setIsLinkSent] = useState("");
    const {error} = useAppSelector(state => state.auth);

    const sendResetLink = async (e: any) => {
        e.preventDefault();
        const response = await dispatch(forgot(email));
        setEmail('');
        if (response!.status === 200) {
            setIsLinkSent(response!.data.message);
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 5000);
        }
    }

    return (
        <ForgotPageBlock>
            <FormHeading>Forgot password?</FormHeading>
            <ForgotForm onSubmit={(e) => sendResetLink(e)}>
                {error ? <FormError>{error}</FormError> : <TextInfo>We'll send you a reset link on your email.</TextInfo>}
                <Divider/>
                {
                    !isLinkSent
                    ?
                    <>
                        <FormInput
                            required
                            type="email"
                            placeholder="Enter your email..."
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <FormSubmit type="submit">Send reset link</FormSubmit>
                    </>
                    : <TextInfo>{isLinkSent}</TextInfo>
                }
            </ForgotForm>
        </ForgotPageBlock>
    );
};

export default ForgotPage;
