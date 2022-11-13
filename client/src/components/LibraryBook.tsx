import React, {useState} from "react";
import styled from "styled-components";
import {Book} from "../types/IState";
import BookSettingsModal from "./BookSettingsModal";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux";
import {bookSlice} from "../store/reducers/BookSlice";
import BookImageCap from "../assets/images/book-image-cap.jpg";

const LibraryBookBlock = styled.div`
  position: relative;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2); 
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  transition: .1s;
  padding-right: 30px;
`;
const BookThumbnailWrapper = styled.div`
  height: 200px;
  width: 130px;
  background-color: ${(props) => props.theme.main};
  cursor: Pointer;
  margin-right: 30px;
  @media (max-width: 575px) {
    height: 100px;
    width: 65px;
    margin-right: 15px;
  }
`;

const BookThumbnail = styled.img`
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  height: 200px;
  width: 130px;
  border-radius: 5px;
  margin-right: 20px;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.main};
  font-size: 12px;
  @media (max-width: 575px) {
    height: 100px;
    width: 65px;
  }
`;
const BookData = styled.div`
  width: 100%;
`;
const BookName = styled.p`
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin: 0 0 5px;
  color: ${(props) => props.theme.text};
  @media (max-width: 575px) {
    font-size: 10px;
    margin-bottom: 5px;
  }
`;
const AuthorName = styled.span`
  display: block;
  font-size: 14px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.bookInfo};
  @media (max-width: 575px) {
    font-size: 10px;
    margin-bottom: 10px;
  }
`;
const BookSettingsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReadPercent = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.bookInfo};
  @media (max-width: 575px) {
    font-size: 10px;
  }
`;
const BookButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    svg {
      ellipse {
        fill: ${(props) => props.theme.secondary}
      }
    }
  }
`;

const LibraryBook = ({book_path, title, author, is_read, is_reading, current_page, pages, thumbnail_path, id}: Book) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState(false);

    const shortenName = (str: any) => str.length > 55 ? str.slice(0, 55) + '...' : str.slice(0, 55);
    const openBook = () => {
        dispatch(bookSlice.actions.setCurrentBook(id));
        navigate("/reader");
    };
    const calculatePercent = (curr: any, max: any) => {
        const percent = Math.round(curr * 100 / max);
        if (!is_reading && !is_read)
            return "Not read";
        if (is_reading && !is_read)
            return `${percent}%`;
        if (!is_reading && is_read)
            return "Finished";
    };
    const showSettings = () => {
        setModalActive(true)
    };

    return (
        <LibraryBookBlock>
            <BookThumbnailWrapper onClick={openBook}>
                <BookThumbnail
                    src={thumbnail_path + "asd"}
                    alt={title}
                    loading={"lazy"}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src=BookImageCap;
                    }}
                />
            </BookThumbnailWrapper>
            <BookData>
                <BookName onClick={openBook}>{shortenName(title)}</BookName>
                <AuthorName>{shortenName(author)}</AuthorName>
                <BookSettingsBlock>
                    <ReadPercent>{calculatePercent(current_page, pages)}</ReadPercent>
                    <BookButton onClick={showSettings}>
                        <svg width="28" height="14" viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="9.16052" cy="7.78449" rx="1.80115" ry="1.85345" fill="#64645D"/>
                            <ellipse cx="17.806" cy="7.78449" rx="1.80115" ry="1.85345" fill="#64645D"/>
                            <ellipse cx="27.1722" cy="7.78449" rx="1.80115" ry="1.85345" fill="#64645D"/>
                        </svg>
                    </BookButton>
                    <BookSettingsModal
                        active={modalActive}
                        setActive={setModalActive}
                        bookId={id}
                        bookPath={book_path}
                    />
                </BookSettingsBlock>
            </BookData>
        </LibraryBookBlock>
    );
};

export default LibraryBook;
