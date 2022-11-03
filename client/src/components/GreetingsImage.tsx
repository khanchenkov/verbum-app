import React, {memo} from 'react';
import image from "../assets/images/greeting-image.jpg";
import styled from "styled-components";

const HeroImage = styled.img`
    border-radius: 5px;
    width: calc(250px + (550 - 250) * ((100vw - 320px) / (1440 - 320)));
    height: calc(210px + (380 - 210) * ((100vw - 320px) / (1440 - 320)));;
    object-fit: cover;
    @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
    }
`;

const GreetingsImage = () => {
    return (
        <HeroImage src={image} alt="Read books with comfort"/>
    );
};

export default memo(GreetingsImage);
