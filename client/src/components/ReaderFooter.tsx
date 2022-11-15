import React, {useState, FC} from "react";
import styled from "styled-components";
import NavModal from "./NavModal";
import {BurgerButton, SliderInput} from "../styles/UILibrary";
import {useAppSelector} from "../hooks/redux";
import {ReaderFooterProps} from "../types/IProps";

const FooterBlock = styled.footer`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  border-top: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.main};
  text-align: center;
  height: 45px;
`;
const ProfileModalBlock = styled.div`
  width: 150px;
`;
const PageController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PageNumber = styled.span`
  color: ${(props) => props.theme.text};
  font-size: 14px;
`;
const PageChangeButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    margin: 0 5px;
    height: 24px;
    svg {
        path {
            fill: ${(props) => props.theme.bookInfo};
            transition: .2s;
        }
    }
    &:hover {
        svg {
            path {
              fill: ${(props) => props.theme.secondary};
            }
        }
    }
`;
const ZoomController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 575px) {
    display: none;
  }
`;
const ZoomValue = styled.span`
  font-size: 14px;
  margin-right: 10px;
  color: ${(props) => props.theme.text};
`;

const ReaderFooter: FC<ReaderFooterProps> = ({pageNumber, numPages, changePageNext, changePageBack, zoomValue, setZoomValue}) => {
    const {avatar, user_name} = useAppSelector(state => state.user.userInfo);
    const [modalActive, setModalActive] = useState<boolean>(false);

    const showModal = () => {
        document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
        document.body.style.overflow = "hidden";
        setModalActive(true);
    };

    return (
        <FooterBlock>
            <ProfileModalBlock>
                <BurgerButton onClick={showModal}>
                    <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="4" rx="2" fill="#C5A45B"/>
                        <rect y="7" width="30" height="4" rx="2" fill="#C5A45B"/>
                        <rect y="14" width="30" height="4" rx="2" fill="#C5A45B"/>
                    </svg>
                </BurgerButton>
                <NavModal
                    active={modalActive}
                    setActive={setModalActive}
                    avatar={avatar}
                    name={user_name}
                    position={"footer"}
                />
            </ProfileModalBlock>
            <PageController>
                <PageChangeButton onClick={changePageBack}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11C22 8.82441 21.3549 6.69767 20.1462 4.88873C18.9375 3.07979 17.2195 1.66989 15.2095 0.83733C13.1995 0.0047663 10.9878 -0.21307 8.85401 0.211367C6.72022 0.635805 4.7602 1.68345 3.22183 3.22183C1.68345 4.76021 0.635802 6.72022 0.211365 8.85401C-0.213072 10.9878 0.00476476 13.1995 0.837329 15.2095C1.66989 17.2195 3.07979 18.9375 4.88873 20.1462C6.69767 21.3549 8.82441 22 11 22C13.9174 22 16.7153 20.8411 18.7782 18.7782C20.8411 16.7153 22 13.9174 22 11V11ZM17.2857 11.7857L7.73929 11.7857L12.1236 16.1912L11 17.2857L4.71429 11L11 4.71429L12.1236 5.8355L7.73929 10.2143L17.2857 10.2143L17.2857 11.7857Z"/>
                    </svg>
                </PageChangeButton>
                <PageNumber>{pageNumber} of {numPages}</PageNumber>
                <PageChangeButton onClick={changePageNext}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 11C0 13.1756 0.645139 15.3023 1.85383 17.1113C3.06253 18.9202 4.78049 20.3301 6.79048 21.1627C8.80047 21.9952 11.0122 22.2131 13.146 21.7886C15.2798 21.3642 17.2398 20.3165 18.7782 18.7782C20.3165 17.2398 21.3642 15.2798 21.7886 13.146C22.2131 11.0122 21.9952 8.80047 21.1627 6.79048C20.3301 4.78049 18.9202 3.06253 17.1113 1.85383C15.3023 0.645139 13.1756 0 11 0C8.08262 0 5.28472 1.15892 3.22182 3.22182C1.15892 5.28472 0 8.08262 0 11V11ZM4.71428 10.2143H14.2607L9.87643 5.80878L11 4.71428L17.2857 11L11 17.2857L9.87643 16.1645L14.2607 11.7857H4.71428V10.2143Z"/>
                    </svg>
                </PageChangeButton>
            </PageController>
            <ZoomController>
                <ZoomValue>{zoomValue + "%"}</ZoomValue>
                <SliderInput
                    type="range"
                    min={100}
                    max={200}
                    step={50}
                    width={"100px"}
                    value={zoomValue}
                    onChange={e => setZoomValue(e.target.value)}
                />
            </ZoomController>
        </FooterBlock>
    );
};

export default ReaderFooter;