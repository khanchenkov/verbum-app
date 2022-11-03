import React from 'react';
import styled from "styled-components";

const ProfilePageBlock = styled.div`
  margin-top: 30px;
`;

const ProfilePage = () => {
    return (
        <ProfilePageBlock>
            <h1>Hi User</h1>
            {/*<UserPanel>*/}
            {/*    <UserInfo*/}
            {/*        avatar={avatar}*/}
            {/*        name={name}*/}
            {/*        status={status}*/}
            {/*    />*/}
            {/*    <ReadingInfo*/}
            {/*        daily_goal={daily_goal}*/}
            {/*        days_reading={days_reading}*/}
            {/*        reading_time={reading_time}*/}
            {/*    />*/}
            {/*</UserPanel>*/}
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
