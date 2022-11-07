import React, {FC, useState} from 'react';
import styled from "styled-components";
import {Container, SignUpButton} from "../styles/UILibrary";
import {useNavigate} from "react-router-dom";
import Logo from "./Logo";
import NavModal from "./NavModal";
import {HeaderProps} from "../types/IProps";
import {useAppSelector} from "../hooks/redux";
import DarkModeButton from "./DarkModeButton";

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
const ProfileImage = styled.img`
  display: block;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
`;
const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    const {avatar, user_name} = useAppSelector(state => state.user.userInfo);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const navigate = useNavigate();

    const showModal = () => {
        document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
        document.body.style.overflow = 'hidden';
        setModalActive(true);
    };
    const navigateUser = (path: string) => {
        navigate(path);
        window.location.reload();
    }

    return (
        <HeaderBlock>
            <Container>
                <HeaderGroup>
                    <div onClick={() => navigate('/')}>
                        <Logo/>
                    </div>
                    {
                        isAuth ?
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
                                name={user_name}
                            />
                        </>
                        :
                        <LinksWrapper>
                            <DarkModeButton/>
                            <LogInButton onClick={() => navigateUser('/login')}>Log in</LogInButton>
                            <SignUpButton onClick={() => navigateUser('/signup')}>Sign up</SignUpButton>
                        </LinksWrapper>
                    }
                </HeaderGroup>
            </Container>
        </HeaderBlock>
    );
};

export default Header;
