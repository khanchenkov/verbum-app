import React, {FC} from "react";
import styled from "styled-components";
import BookService from "../services/BookService";

interface BookSettingsModalProps {
    active: boolean
    setActive: any
    bookId: number | undefined
    bookPath: string | undefined
}
interface BookSettingsBlockStyleProps {
    active: boolean
}

const BookSettingsBlock = styled.div<BookSettingsBlockStyleProps>`
  z-index: 100;
  background-color: ${(props) => props.theme.main};
  padding: 5px 5px 3px 13px;
  width: 150px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  display: none;
  flex-direction: column;
  ${({ active }) => active && `
    display: flex;
  `}
`;
const CloseButton = styled.button`
  margin-left: auto;
  margin-bottom: 10px;
  padding: 0;
  border-radius: 100%;
  border: none;
  width: 20px;
  height: 20px;
  background: none;
  cursor: pointer;  
  svg {
    path {
      fill: ${(props) => props.theme.utility};
      transition: 0.1s;
    }
    &:hover {
        path {
          fill: ${(props) => props.theme.secondary};
        }
    }
  }
`;
const BookSettingsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const SettingsEl = styled.li`
  margin-bottom: 10px;
  span {
    font-size: 14px;
  }
`;
export const SettingsButton = styled.button`
  padding: 0;
  background: none;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .1s;
  span {
    color: ${(props) => props.theme.secondary};
    font-size: 16px;
    margin-left: 10px;
  }
  &:hover {
    background: ${(props) => props.theme.border};
  }
`;

const BookSettingsModal: FC<BookSettingsModalProps> = ({active, setActive, bookId, bookPath}) => {

    const hideModal = () => {
        setActive(false);
    };
    const removeBook = async (bookId: number | undefined) => {
        try {
            window.location.reload();
            await BookService.removeBook(bookId);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <BookSettingsBlock active={active}>
            <CloseButton onClick={hideModal}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.75 0C11.0706 0 13.2962 0.921872 14.9372 2.56282C16.5781 4.20376 17.5 6.42936 17.5 8.75C17.5 11.0706 16.5781 13.2962 14.9372 14.9372C13.2962 16.5781 11.0706 17.5 8.75 17.5C6.42936 17.5 4.20376 16.5781 2.56282 14.9372C0.921872 13.2962 0 11.0706 0 8.75C0 6.42936 0.921872 4.20376 2.56282 2.56282C4.20376 0.921872 6.42936 0 8.75 0V0ZM8.75 7.68875L6.7175 5.65625C6.57677 5.51552 6.3859 5.43646 6.18688 5.43646C5.98785 5.43646 5.79698 5.51552 5.65625 5.65625C5.51552 5.79698 5.43646 5.98785 5.43646 6.18688C5.43646 6.3859 5.51552 6.57677 5.65625 6.7175L7.68875 8.75L5.65625 10.7825C5.58657 10.8522 5.53129 10.9349 5.49358 11.026C5.45587 11.117 5.43646 11.2146 5.43646 11.3131C5.43646 11.4117 5.45587 11.5093 5.49358 11.6003C5.53129 11.6913 5.58657 11.7741 5.65625 11.8438C5.72593 11.9134 5.80866 11.9687 5.8997 12.0064C5.99075 12.0441 6.08833 12.0635 6.18688 12.0635C6.28542 12.0635 6.383 12.0441 6.47405 12.0064C6.56509 11.9687 6.64782 11.9134 6.7175 11.8438L8.75 9.81125L10.7825 11.8438C10.8522 11.9134 10.9349 11.9687 11.026 12.0064C11.117 12.0441 11.2146 12.0635 11.3131 12.0635C11.4117 12.0635 11.5093 12.0441 11.6003 12.0064C11.6913 11.9687 11.7741 11.9134 11.8438 11.8438C11.9134 11.7741 11.9687 11.6913 12.0064 11.6003C12.0441 11.5093 12.0635 11.4117 12.0635 11.3131C12.0635 11.2146 12.0441 11.117 12.0064 11.026C11.9687 10.9349 11.9134 10.8522 11.8438 10.7825L9.81125 8.75L11.8438 6.7175C11.9134 6.64782 11.9687 6.56509 12.0064 6.47405C12.0441 6.383 12.0635 6.28542 12.0635 6.18688C12.0635 6.08833 12.0441 5.99075 12.0064 5.8997C11.9687 5.80866 11.9134 5.72593 11.8438 5.65625C11.7741 5.58657 11.6913 5.53129 11.6003 5.49358C11.5093 5.45587 11.4117 5.43646 11.3131 5.43646C11.2146 5.43646 11.117 5.45587 11.026 5.49358C10.9349 5.53129 10.8522 5.58657 10.7825 5.65625L8.75 7.68875Z"
                    />
                </svg>
            </CloseButton>
            <BookSettingsList>
                <SettingsEl>
                    <SettingsButton onClick={() => removeBook(bookId)}>
                        <svg width="13" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.375 2.8125H11.875V1.25C11.875 0.560547 11.3145 0 10.625 0H4.375C3.68555 0 3.125 0.560547 3.125 1.25V2.8125H0.625C0.279297 2.8125 0 3.0918 0 3.4375V4.0625C0 4.14844 0.0703125 4.21875 0.15625 4.21875H1.33594L1.81836 14.4336C1.84961 15.0996 2.40039 15.625 3.06641 15.625H11.9336C12.6016 15.625 13.1504 15.1016 13.1816 14.4336L13.6641 4.21875H14.8438C14.9297 4.21875 15 4.14844 15 4.0625V3.4375C15 3.0918 14.7207 2.8125 14.375 2.8125ZM10.4688 2.8125H4.53125V1.40625H10.4688V2.8125Z"
                                  fill="#C5A45B"
                            />
                        </svg>
                        <span>Remove</span>
                    </SettingsButton>
                </SettingsEl>
            </BookSettingsList>
        </BookSettingsBlock>
    );
};

export default BookSettingsModal;
