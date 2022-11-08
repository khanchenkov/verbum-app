import React from "react";
import styled from "styled-components";
import UploadBookPanel from "../components/UploadBookPanel";
import {useAppSelector} from "../hooks/redux";
import LibraryBook from "../components/LibraryBook";

const LibraryBlock = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  padding-bottom: 50px;
  @media (max-width: 575px) {
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 10px;
  }
`;
const EmptyLibraryInfo = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 28px;
`;


const LibraryPage = () => {
    const books = useAppSelector(state => state.book.library)

    return (
        <>
            <UploadBookPanel booksNum={books.length}/>
            <LibraryBlock>
                {
                    books.length > 0 ?
                    books
                        // .sort((a, b) =>
                        //     (Math.round(b.current_page * 100 / b.pages) - Math.round(a.current_page * 100 / a.pages))
                        // )
                        .map(item => <LibraryBook key={item.id} {...item}/>)
                    :
                    <EmptyLibraryInfo>There are no books yet!</EmptyLibraryInfo>
                }
            </LibraryBlock>
        </>
    );
};

export default LibraryPage;
