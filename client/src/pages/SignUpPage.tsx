import React, {useState, useEffect} from 'react';
import {Divider, FormLabel, FormInput, FormSubmit, FormBlock, FormHeading, FormError} from "../styles/UILibrary";
import Loading from "../components/Loading";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    useEffect(() => {

    }, []);


    const isLoading = false;
    const error = '';
    const clientError = '';

    const formHandler = async (e: any) => {
        e.preventDefault();
            // if (password === password2) {
            //     await dispatch(registerUser(email, password));
            // } else {
            //     setClientError('Passwords doesn\'t match.');
            // }
        setEmail('');
        setPassword('');
        setPassword2('');
        // if (isAuth) {
        //     navigate('/stats');
        // }
    }

    return (
        <FormBlock>
            {isLoading && <Loading/>}
            <FormHeading>Sign Up</FormHeading>
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
                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                    required
                    type="password"
                    placeholder="Confirm password..."
                    name="confirm-password"
                    autoComplete="off"
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                />
                <FormSubmit type="submit">Continue</FormSubmit>
            </form>
        </FormBlock>
    );
};

export default SignUpPage;
