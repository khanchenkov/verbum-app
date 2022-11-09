import React, {useEffect} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import UserInfo from "../components/UserInfo";
import ReadingInfo from "../components/ReadingInfo";
import {getUserInfo} from "../store/actions/UserActionCreators";

const ProfilePageBlock = styled.div`
  margin-top: 30px;
`;
const UserPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const {avatar, user_name, status, daily_goal, days_reading, reading_time} = useAppSelector(state => state.user.userInfo);
    const books = useAppSelector(state => state.book.library)

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    return (
        <ProfilePageBlock>
            <UserPanel>
                <UserInfo
                    avatar={avatar}
                    name={user_name}
                    status={status}
                    booksReading={books.filter(el => el.is_reading).length}
                    booksRead={books.filter(el => el.is_read).length}
                />
                <ReadingInfo
                    daily_goal={daily_goal}
                    days_reading={days_reading}
                    reading_time={reading_time}
                />
            </UserPanel>
            {/*<CollectionList collectionName={"Текущие"} isTypeUnread={false}>*/}
            {/*    <CurrentBook/>*/}
            {/*    <CurrentBook/>*/}
            {/*    <CurrentBook/>*/}
            {/*</CollectionList>*/}
            {/*<CollectionList collectionName={"Хочу прочитать"} isTypeCollection={true}>*/}
            {/*    <UnreadBook/>*/}
            {/*    <UnreadBook/>*/}
            {/*    <UnreadBook/>*/}
            {/*    <UnreadBook/>*/}
            {/*    <UnreadBook/>*/}
            {/*    <UnreadBook/>*/}
            {/*    <UnreadBook/>*/}
            {/*    <UnreadBook/>*/}
            {/*</CollectionList>*/}
        </ProfilePageBlock>
    );
};

export default ProfilePage;
