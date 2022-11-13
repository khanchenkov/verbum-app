import React from "react";
import styled from "styled-components";
import {useAppSelector} from "../hooks/redux";
import UserInfo from "../components/UserInfo";
import ReadingInfo from "../components/ReadingInfo";
import CollectionList from "../components/CollectionList";
import LibraryBook from "../components/LibraryBook";

const ProfilePageBlock = styled.div`
  margin-top: 30px;
`;
const UserPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 75px;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const ProfilePage = () => {
    const {avatar, user_name, status, daily_goal, days_reading, reading_time} = useAppSelector(state => state.user.userInfo);
    const books = useAppSelector(state => state.book.library)

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
            <CollectionList collectionName="Reading now">
                {books.filter(el => el.is_reading === true).map(item => <LibraryBook key={item.id} {...item}/>)}
            </CollectionList>
        </ProfilePageBlock>
    );
};

export default ProfilePage;
