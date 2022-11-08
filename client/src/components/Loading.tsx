import React from 'react';
import styled, {keyframes} from "styled-components";

const LoadingBlock = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.loadingBg};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 1s linear infinite;
`;
const Svg = styled.svg`
  display:block;
  background-repeat:initial;
  background-color: transparent;
  animation-play-state:paused;
`;

const Loading = () => {
    return (
        <LoadingBlock>
            <Rotate>
                <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="217px" height="217px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#C5A45B" strokeWidth="2" r="11" strokeDasharray="51.83627878423158 19.27875959474386"/>
                </Svg>
            </Rotate>
        </LoadingBlock>
    );
};

export default Loading;