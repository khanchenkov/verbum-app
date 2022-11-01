import React, {FC, useState} from 'react';
import styled from "styled-components";
import {Container, SignUpButton} from "../styles/UILibrary";
import {redirect, useNavigate} from "react-router-dom";
import Logo from "./Logo";
import NavModal from "./NavModal";
import {HeaderProps} from "../types/IProps";

const HeaderBlock = styled.header`
  margin-bottom: 10px;
`;
const HeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  background-color: ${(props) => props.theme.main};
  border-bottom: 1px solid ${(props) => props.theme.border};
`;
const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProfileImage = styled.img`
  display: block;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
`;
const LogInButton = styled.button`
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.main};
  text-decoration: none;
  font-size: 16px;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  width: 100px;
  padding: 4%;
  cursor: pointer;
  transition: .2s;
  margin-right: 10px;
  @media (max-width: 575px) {
    width: 60px;
    font-size: 12px;
  }
  &:hover{
    background-color: ${(props) => props.theme.border};
  }
`;

const Header: FC<HeaderProps> = ({isAuth}) => {
    const [modalActive, setModalActive] = useState(false);
    const navigate = useNavigate();
    const avatar = '';
    const name = 'Daniil'

    const showModal = () => {
        document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
        document.body.style.overflow = 'hidden';
        setModalActive(true);
    };

    return (
        <HeaderBlock>
            <Container>
                <HeaderGroup>
                    <div onClick={() => navigate('/')}>
                        <Logo/>
                    </div>
                    {
                        isAuth
                            ?
                            <>
                                <div>
                                    <ProfileImage
                                        src={avatar}
                                        onClick={showModal}
                                    />
                                </div>
                                <NavModal
                                    active={modalActive}
                                    setActive={setModalActive}
                                    avatar={avatar}
                                    name={name}
                                />
                            </>
                            :
                            <LinksWrapper>
                                <LogInButton onClick={() => navigate('/login')}>Log in</LogInButton>
                                <SignUpButton onClick={() => navigate('/signup')}>Sign up</SignUpButton>
                            </LinksWrapper>
                    }
                </HeaderGroup>
            </Container>
        </HeaderBlock>
    );
};

export default Header;
