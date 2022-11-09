import React, {FC} from 'react';
import {ReadingInfoProps} from "../types/IProps";
import styled from "styled-components";
import {ProgressBarStyleProps} from "../types/IStyled";

const Progress = styled.div`
  text-align: center;
`;
const BarOverflow = styled.div`
  position: relative;
  overflow: hidden; 
  width: 250px; 
  height: 125px; 
  margin-bottom: -15px; 
`;
const Bar = styled.div<ProgressBarStyleProps>`
  position: absolute;
  top: 0; 
  left: 0;
  width: 250px; 
  height: 250px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 10px solid ${(props) => props.theme.border};
  border-bottom-color: ${(props) => props.theme.secondary};
  border-right-color: ${(props) => props.theme.secondary};
  transform: ${(props) => `rotate(${props.degree}deg)`};
  transition: 1s ease-in-out;
`;
const ReadingGoalInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.text};
  padding-top: 40px;
`;
const ReadingToday = styled.span`
  font-size: 16px;
`;
const ReadingTimeClock = styled.span`
  font-size: 30px;
`;
const DailyGoalText = styled.span`
  font-size: 12px;
`;

const ReadingInfo: FC<ReadingInfoProps> = ({days_reading, reading_time , daily_goal}) => {
    const getTime = (time?: number) => {
        const secondsToTime = time ? time : 0;
        return new Date(secondsToTime * 1000).toISOString().slice(11, 19);
    }
    const getDegreeProgress = (reading?: number, read?: number) => {
        return reading! > read! ? 225 :  45 + (180 * Number(reading) / Number(read));
    }

    return (
        <Progress>
            <BarOverflow>
                <Bar
                    degree={getDegreeProgress(reading_time, daily_goal)}
                />
                <ReadingGoalInfo>
                    <ReadingToday>Reading today</ReadingToday>
                    <ReadingTimeClock>{getTime(reading_time)}</ReadingTimeClock>
                    <DailyGoalText>Daily goal {daily_goal!/60} min.</DailyGoalText>
                </ReadingGoalInfo>
            </BarOverflow>
        </Progress>
    );
};

export default ReadingInfo;
