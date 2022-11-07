import React, {FC} from 'react';
import {ReadingInfoProps} from "../types/IProps";
import styled from "styled-components";
import {ProgressBarStyle} from "../types/IStyled";

const ReadingInfoBLock = styled.div`
  width: 100%;
  max-width: 400px;
`;
const ReadHeading = styled.span`
  display: block;
  font-size: 18px;
  color: ${(props) => props.theme.text};
`;
const ReadingTime = styled.span`
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.text};
`;
const ProgressBar = styled.div<ProgressBarStyle>`
  height: 5px;
  width: 100%;
  background-color: ${(props) => props.theme.border};
  border-radius: 5px;
  margin-bottom: 15px;
  div {
    height: 5px;
    width: ${props => props.percent && props.dailyGoal !== 0 ? (props.percent / 60) : 0}%;
    max-width: 100%;
    background-color: ${(props) => props.theme.secondary};
    border-radius: 5px;
  }
`;
const ReadingGoal = styled.span`
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.text};
  span {
    color: ${(props) => props.theme.secondary};
  }
`;

const ReadingInfo: FC<ReadingInfoProps> = ({days_reading, reading_time, daily_goal}) => {
    const getTime = (time?: number) => {
        const secondsToTime = time ? time : 0;
        return new Date(secondsToTime * 1000).toISOString().slice(11, 19);
    }
    const getPercent = (reading?: number, read?: number) => {
        return 100 * Number(reading) / Number(read);
    }

    return (
        <ReadingInfoBLock>
            <ReadHeading>Reading today:</ReadHeading>
            <ReadingTime>{getTime(reading_time)}</ReadingTime>
            <ProgressBar percent={getPercent(reading_time, daily_goal)} dailyGoal={daily_goal}>
                <div></div>
            </ProgressBar>
            <ReadingGoal>Goal: <span>{daily_goal} min</span></ReadingGoal>
        </ReadingInfoBLock>
    );
};

export default ReadingInfo;
