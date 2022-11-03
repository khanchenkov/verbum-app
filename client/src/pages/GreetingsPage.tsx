import React from 'react';
import styled from "styled-components";
import {SignUpButton} from "../styles/UILibrary";
import {useNavigate} from "react-router-dom";
import GreetingsImage from "../components/GreetingsImage";

const HeroBlock = styled.div`
  display: flex;
  margin-top: calc(10px + (120 - 10) * ((100vw - 320px)/(1440 - 320)));
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const HeadingGroup = styled.div``;
const Heading = styled.h1`
  font-size: calc(22px + (62 - 24) * ((100vw - 320px) / (1440 - 320)));
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: calc(15px + (25 - 15) * ((100vw - 320px) / (1440 - 320)));
  color: ${(props) => props.theme.text};
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
    text-align: center;
  }
`;
const Description = styled.p`
  color: ${(props) => props.theme.secondary};
  font-size: calc(11px + (18 - 11) * ((100vw - 300px) / (1440 - 300)));
  line-height: 1.3;
  margin-bottom: calc(10px + (25 - 5) * ((100vw - 320px) / (1440 - 320)));
  @media (max-width: 768px) {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const GreetingsPage = () => {
    const navigate = useNavigate()

    return (
        <HeroBlock>
            <HeadingGroup>
                <Heading>Your library. <br/> In your hands.</Heading>
                <Description>
                    Read your books offline.
                    Share your opinion with friends. <br/>
                    Discover something new every time.
                </Description>
                <SignUpButton onClick={() => navigate("/signup")}>Sign up</SignUpButton>
            </HeadingGroup>
            <GreetingsImage/>
        </HeroBlock>
    );
};

export default GreetingsPage;
