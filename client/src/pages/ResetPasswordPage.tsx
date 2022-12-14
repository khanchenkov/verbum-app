import React, {useState, useEffect, useCallback} from "react";
import styled from "styled-components";
import {FormHeading, Divider, FormLabel, FormInput, FormError, FormSubmit} from "../styles/UILibrary";
import {useParams, useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import {checkResetLink} from "../store/actions/AuthActionCreators";
import {useAppDispatch} from "../hooks/redux";

const ResetPageBlock = styled.div`
  margin-top: 110px;
`;
const ResetForm = styled.form`
  width: 300px;
  margin: 0 auto;
`;
const ResponseMessage = styled.h2`
  text-align: left;
  color: ${(props) => props.theme.text};
  font-size: 26px;
`;

const ResetPasswordPage = () => {
    const {link} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [clientError, setClientError] = useState<string>("");
    const [isSucceed, setIsSucceed] = useState<boolean>(false);

    const checkLink = useCallback(async (link: string | undefined) => {
        return dispatch(checkResetLink(link))
    }, [dispatch]);

    useEffect(() => {
        checkLink(link)
            .then((res) => !res!.data && navigate("/login"))
            .catch((err) => {setErrorText(err.response.data.message)});
    }, [link, navigate, checkLink]);

    const resetPassword = async (e: any) => {
        e.preventDefault();
        if (password === password2 && password !== "" && password.length >= 3) {
            const res = await checkLink(link);
            if (res!.data) {
                const res = await AuthService.reset(password);
                if (res.status === 200) {
                    setIsSucceed(true);
                        setTimeout(() => {
                            navigate("/login");
                            window.location.reload()
                        }, 3000);
                }
            }
        } else {
            setClientError("Passwords doesn't match.");
        }
    }

    if (errorText)
        return <ResponseMessage>{errorText}</ResponseMessage>
    if (isSucceed)
        return <ResponseMessage>Password has been successfully changed.</ResponseMessage>

    return (
        <ResetPageBlock>
            <FormHeading>Set new password</FormHeading>
            <ResetForm onSubmit={(e) => resetPassword(e)}>
                {clientError && <FormError>{clientError}</FormError>}
                <Divider/>
                <FormLabel>Password</FormLabel>
                <FormInput
                    required
                    type="password"
                    placeholder="Enter your password..."
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <FormLabel>Confirm password</FormLabel>
                <FormInput
                    required
                    type="password"
                    placeholder="Enter your password once more..."
                    name="password2"
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                />
                <FormSubmit type="submit">Reset password</FormSubmit>
            </ResetForm>
        </ResetPageBlock>
    );
};

export default ResetPasswordPage;
