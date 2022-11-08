import React, {FC, useState} from "react";
import styled from "styled-components";
import {UploadBookModalProps} from "../types/IProps";
import {modalBackground as Modal, FormSubmit} from "../styles/UILibrary";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {uploadBook} from "../store/actions/BookActionCreators";
import {bookSlice} from "../store/reducers/BookSlice";

const ModalContent = styled.div`
  z-index: 1000;
  padding: 25px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.main};
  margin: 7% auto;
  max-width: 450px;

  @media (max-width: 768px) {
    margin: 10% auto;  
  }
  @media (max-width: 575px) {
    margin: 12% auto;
  }
`;
const UploadTextBlock = styled.div`
    svg {
        display: block;
        margin: 0 auto 15px;
    }
    p {
        text-align: center;
        width: 50%;
        font-size: 14px;
        margin: 0 auto;
    }
    @media (max-width: 575px) {
        p {
            font-size: 12px
        }
    }
`;
const UploadBookText = styled.p`
  color: ${(props) => props.theme.text}
`;
const UploadBookLink = styled.label`
  color: ${(props) => props.theme.secondary};
  cursor: pointer;
  transition: .2s;
  &:hover {
    color: ${(props) => props.theme.darkSecondary};
  }
`;
const DragArea = styled.div`
  padding: 33% 0 0;
  width: 400px;
  height: 400px;
  border: 2px solid transparent;
  @media (max-width: 768px) {
    padding: 23% 0 0;
    width: 300px;
    height: 300px;
  }
  @media (max-width: 575px) {
    padding: 10% 0 0;
    width: 200px;
    height: 200px;
  }
`;
const DropArea = styled.div`
  border: 2px dashed ${(props) => props.theme.secondary};
  width: 400px;
  height: 400px;
  padding: 33% 0 0;
  @media (max-width: 768px) {
    padding: 23% 0 0;
    width: 300px;
    height: 300px;
  }
  @media (max-width: 575px) {
    padding: 10% 0 0;
    width: 200px;
    height: 200px;
  }
`;
const UploadBookInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const UploadButton = styled(FormSubmit)`
  margin: 10px 0 0;
`;
const UploadInfo = styled.span`
  text-align: center;
  display: block;
  margin-top: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.text};
  @media (max-width: 575px) {
    font-size: 10px
  }
`;
const UploadText = () => {
    return (
        <UploadTextBlock>
            <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M187.5 150H162.5V125H150V150H125V162.5H150V187.5H162.5V162.5H187.5V150Z" fill="#C5A45B"/>
                <path d="M100 175H50V25H100V62.5C100.01 65.8122 101.33 68.9859 103.672 71.3279C106.014 73.67 109.188 74.9901 112.5 75H150V100H162.5V62.5C162.522 61.6786 162.366 60.8622 162.042 60.1069C161.719 59.3517 161.235 58.6755 160.625 58.125L116.875 14.375C116.325 13.7647 115.649 13.2809 114.893 12.9572C114.138 12.6335 113.321 12.4775 112.5 12.5H50C46.6878 12.5099 43.5142 13.83 41.1721 16.1721C38.83 18.5142 37.5099 21.6878 37.5 25V175C37.5099 178.312 38.83 181.486 41.1721 183.828C43.5142 186.17 46.6878 187.49 50 187.5H100V175ZM112.5 27.5L147.5 62.5H112.5V27.5Z" fill="#C5A45B"/>
            </svg>
            <UploadBookText>Drag and drop files here or <UploadBookLink htmlFor="book">browse</UploadBookLink> to begin the upload.</UploadBookText>
        </UploadTextBlock>
    )
};

const UploadBookModal: FC<UploadBookModalProps> = ({active, setActive}) => {
    const dispatch = useAppDispatch();
    const {is_activated} = useAppSelector(state => state.user.userInfo);
    const error = useAppSelector(state => state.book.error);
    const [drag, setDrag] = useState<boolean>(false);
    const [file, setFile] = useState<any>(null);
    const [activationError, setActivationError] = useState<string>("");
    const [uploadStatus, setUploadStatus] = useState<string>("");

    const hideModal = () => {
        document.body.style.overflow = "visible";
        document.body.style.paddingRight = "0px";
        dispatch(bookSlice.actions.uploadingBookSuccess());
        setActive(false);
    };
    const formHandler = async (e: any) => {
        e.preventDefault();
        if (is_activated === false) {
            setActivationError("Account is not activated.");
            return undefined;
        }
        const data = new FormData();
        data.append('book', file);
        const response = await dispatch(uploadBook(data));
        if (response) {
            setUploadStatus(response.data.message);
            window.location.reload();
        } else {
            setFile(null);
        }
    };
    const dragStartHandler = (e: any) => {
        e.preventDefault();
        setDrag(true);
    };
    const dragLeaveHandler = (e: any) => {
        e.preventDefault();
        setDrag(false);
    };
    const onDropHandler = (e: any) => {
        e.preventDefault();
        setUploadStatus("");
        const extensions = ['.pdf'];
        const uploadedFile = e.dataTransfer.files[0];
        const fileExtension = uploadedFile.name.match(/\.\w{1,4}$/)[0];
        if (extensions.indexOf(fileExtension) < 0) {
            setUploadStatus("Only supported books formats: .pdf");
            setDrag(false);
            return undefined;
        }
        setDrag(false);
        setFile(uploadedFile);
    };
    const browseHandler = (e: any) => {
        const selectedFile = e.target.files[0];
        setUploadStatus('');
        setFile(selectedFile);
    };

    return (
        <Modal onClick={hideModal} active={active}>
            <ModalContent onClick={(e: any) => e.stopPropagation()}>
                <UploadInfo>{error || uploadStatus}</UploadInfo>
                <form encType="multipart/form-data" onSubmit={(e)=>formHandler(e)}>
                    {
                        drag ?
                        <DropArea
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                            onDrop={e => onDropHandler(e)}
                        >
                            <UploadText/>
                        </DropArea>
                        :
                        <DragArea
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                        >
                            <UploadText/>
                        </DragArea>
                    }
                    <UploadBookInput
                        type="file"
                        name="book"
                        id="book"
                        onChange={(e) => browseHandler(e)}
                        accept={".pdf"}
                    />
                    {file && <UploadInfo>{file.name}</UploadInfo>}
                    {activationError && <UploadInfo>{activationError}</UploadInfo>}
                    {file && <UploadButton type="submit">Upload</UploadButton>}
                </form>
            </ModalContent>
        </Modal>
    );
};

export default UploadBookModal;
