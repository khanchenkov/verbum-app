import React, {FC} from "react";
import styled from "styled-components";
import {UserInfoProps} from "../types/IProps";

const UserInfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 850px) {
    margin-bottom: 50px;
    width: 100%;
    flex-direction: column;
  }
`;
const UserImage = styled.img`
  border-radius: 5px;
  width: 125px;
  height: 125px;
  margin-right: 35px;
  @media (max-width: 850px) {
    margin: 0 0 15px;
  }
`;
const UserData = styled.div`
  @media (max-width: 850px) {
    text-align: center;
  }
`;
const UserName = styled.p`
  font-size: 28px;
  color: ${(props) => props.theme.text};
  margin: 0;
`;
const UserStatus = styled.p`
  font-size: 14px;
  margin: 0 0 20px 0;
  color: ${(props) => props.theme.secondary};
`;
const UserStats = styled.div`
  display: flex;
  justify-content: space-between;
  div p {
    margin: 0;
    font-size: 14px;
    color: ${(props) => props.theme.text};
  }
  div p:first-child {
    color: ${(props) => props.theme.secondary}
  }
  @media (max-width: 850px) {
    margin: 0;
  }
`;

const UserInfo: FC<UserInfoProps> = ({avatar, name, status, booksReading, booksRead}) => {
    return (
        <UserInfoBlock>
            <UserImage src={avatar}/>
            <UserData>
                <UserName>{name}</UserName>
                <UserStatus>{status}</UserStatus>
                <UserStats>
                    <div>
                        <p>{booksReading}</p>
                        <p>Reading</p>
                    </div>
                    <div>
                        <p>{booksRead}</p>
                        <p>Read</p>
                    </div>
                    <div>
                        <p>?</p>
                        <p>Want to read</p>
                    </div>
                </UserStats>
            </UserData>
        </UserInfoBlock>
    );
};

export default UserInfo;
