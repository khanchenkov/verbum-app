import React, {useState, FC} from "react";
import styled from "styled-components";
import {UploadBookPanelProps} from "../types/IProps";
import UploadBookModal from "./UploadBookModal";

const UploadPanelBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 10px;
  @media (max-width: 575px) {
    margin-bottom: 0;
  }
`;
const LibraryLink = styled.div`
  h3 {
    font-size: 24px;
    font-weight: normal;
    color: ${(props) => props.theme.text};
    @media (max-width: 575px) {
      font-size: 18px;
    }
  }
  span {
    font-size: 18px;
    color: ${(props) => props.theme.secondary};
    margin-left: 15px;
    @media (max-width: 575px) {
      font-size: 15px;
    }
  }
`;
const UploadButton = styled.button`
  display: block;
  width: 100px;
  padding: 5px 0;
  border-radius: 5px;
  font-size: 14px;
  background-color: transparent;
  color: ${(props) => props.theme.secondary};
  border: 1px solid ${(props) => props.theme.secondary};
  cursor: pointer;
  text-align: center;
  transition: .2s;
  &:hover {
    color: ${(props) => props.theme.main};
    background-color: ${(props) => props.theme.secondary};
  }
  @media (max-width: 575px) {
    width: 80px;
    font-size: 12px;
  }
`;

const UploadBookPanel: FC<UploadBookPanelProps> = ({booksNum}) => {
    const [modalActive, setModalActive] = useState<boolean>(false);

    const showModal = () => {
        document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
        document.body.style.overflow = 'hidden';
        setModalActive(true);
    };

    return (
        <UploadPanelBlock>
            <LibraryLink>
                <h3>My Library <span>{booksNum} {booksNum === 1 ? 'book' : 'books'}</span></h3>
            </LibraryLink>
            <UploadButton onClick={showModal}>Upload</UploadButton>
            <UploadBookModal
                active={modalActive}
                setActive={setModalActive}
            />
        </UploadPanelBlock>
    );
};

export default UploadBookPanel;
