import React, {FC} from 'react';
import {NavModalProps} from "../types/IProps";
import {modalBackground as Modal, Divider, SettingsElement, SettingsButton} from "../styles/UILibrary";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../store/actions/AuthActionCreators";
import {useAppDispatch} from "../hooks/redux";

const ModalContent = styled.div`
  position: relative;
  left: 0;
  top: 0;
  z-index: 100000000;
  padding: 30px 35px;
  border-radius: 5px;
  width: 230px;
  background-color: ${(props) => props.theme.main};
  margin: 57px calc((100% - (calc(300px + (1140 - 300) * ((100vw - 320px)/(1440 - 320))))) / 2) 0 0;
`;
const UserImage = styled.img`
  display: block;
  border-radius: 100%;
  height: 60px;
  width: 60px;
  margin: 0 auto;
`;
const UserName = styled.p`
  font-size: 24px;
  color: ${(props) => props.theme.secondary};
  text-align: center;
`;
const SettingsList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NavModal: FC<NavModalProps> = ({active, setActive, avatar, name}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const hideModal = () => {
        document.body.style.overflow = 'visible';
        document.body.style.paddingRight = '0px';
        setActive(false);
    }
    const navigateUser = async (path: string) => {
        document.body.style.overflow = 'visible';
        document.body.style.paddingRight = '0px';
        setActive(false);
        if (path === '/logout') {
            await dispatch(logoutUser());
        }
        navigate(path);
        // window.location.reload();
    }

    return (
        <Modal onClick={hideModal} active={active}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <UserImage src={avatar}/>
                <UserName>{name}</UserName>
                <Divider/>
                <SettingsList>
                    <SettingsElement>
                        <SettingsButton onClick={() => navigateUser('/profile')}>
                            <svg width="20" height="23" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15 28.5C22.4557 28.5 28.5 22.4557 28.5 15C28.5 7.54425 22.4557 1.5 15 1.5C7.54425 1.5 1.5 7.54425 1.5 15C1.5 22.4557 7.54425 28.5 15 28.5ZM15 30C23.2845 30 30 23.2845 30 15C30 6.7155 23.2845 0 15 0C6.7155 0 0 6.7155 0 15C0 23.2845 6.7155 30 15 30Z" fill="#C4A35A"/>
                                <path d="M6 23.7225C6 22.9478 6.579 22.293 7.35 22.2075C13.1363 21.567 16.89 21.6248 22.6635 22.2218C22.9518 22.252 23.2251 22.3656 23.4499 22.5486C23.6747 22.7317 23.8414 22.9762 23.9295 23.2524C24.0176 23.5285 24.0234 23.8244 23.9462 24.1038C23.8689 24.3832 23.712 24.6341 23.4945 24.8258C16.6808 30.765 12.7868 30.6833 6.48 24.8318C6.1725 24.5468 6 24.1418 6 23.7233V23.7225Z" fill="#C4A35A"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M22.5863 22.9673C16.8585 22.3748 13.1588 22.3193 7.43175 22.953C7.24324 22.975 7.06945 23.0657 6.94365 23.2078C6.81786 23.35 6.74891 23.5335 6.75 23.7233C6.75 23.9378 6.83925 24.141 6.99 24.282C10.116 27.1815 12.4845 28.4918 14.7998 28.5C17.1233 28.5083 19.6193 27.2085 23.0018 24.261C23.1092 24.1654 23.1866 24.0406 23.2244 23.9018C23.2623 23.763 23.259 23.6162 23.215 23.4792C23.171 23.3423 23.0881 23.221 22.9765 23.1303C22.8649 23.0395 22.7293 22.9832 22.5863 22.968V22.9673ZM7.2675 21.462C13.1145 20.8148 16.923 20.8733 22.7415 21.4755C23.1752 21.5208 23.5863 21.6915 23.9245 21.9669C24.2627 22.2422 24.5133 22.6101 24.6455 23.0257C24.7778 23.4412 24.7861 23.8863 24.6693 24.3065C24.5525 24.7266 24.3157 25.1036 23.988 25.3913C20.5568 28.3823 17.6993 30.0113 14.7953 30C11.883 29.9895 9.1515 28.3328 5.97075 25.3815C5.74302 25.1694 5.56147 24.9126 5.43746 24.6271C5.31345 24.3417 5.24963 24.0337 5.25 23.7225C5.24891 23.1633 5.45416 22.6234 5.82643 22.2062C6.1987 21.7889 6.71182 21.5237 7.2675 21.4613V21.462Z" fill="#C4A35A"/>
                                <path d="M21 12C21 13.5913 20.3679 15.1174 19.2426 16.2426C18.1174 17.3679 16.5913 18 15 18C13.4087 18 11.8826 17.3679 10.7574 16.2426C9.63214 15.1174 9 13.5913 9 12C9 10.4087 9.63214 8.88258 10.7574 7.75736C11.8826 6.63214 13.4087 6 15 6C16.5913 6 18.1174 6.63214 19.2426 7.75736C20.3679 8.88258 21 10.4087 21 12Z" fill="#C4A35A"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M15 16.5C16.1935 16.5 17.3381 16.0259 18.182 15.182C19.0259 14.3381 19.5 13.1935 19.5 12C19.5 10.8065 19.0259 9.66193 18.182 8.81802C17.3381 7.97411 16.1935 7.5 15 7.5C13.8065 7.5 12.6619 7.97411 11.818 8.81802C10.9741 9.66193 10.5 10.8065 10.5 12C10.5 13.1935 10.9741 14.3381 11.818 15.182C12.6619 16.0259 13.8065 16.5 15 16.5ZM15 18C16.5913 18 18.1174 17.3679 19.2426 16.2426C20.3679 15.1174 21 13.5913 21 12C21 10.4087 20.3679 8.88258 19.2426 7.75736C18.1174 6.63214 16.5913 6 15 6C13.4087 6 11.8826 6.63214 10.7574 7.75736C9.63214 8.88258 9 10.4087 9 12C9 13.5913 9.63214 15.1174 10.7574 16.2426C11.8826 17.3679 13.4087 18 15 18Z" fill="#C4A35A"/>
                            </svg>
                            <span>My Profile</span>
                        </SettingsButton>
                    </SettingsElement>
                    <SettingsElement>
                        <SettingsButton onClick={() => navigateUser('/library')}>
                            <svg width="20" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.84191 0C4.27859 0 4.69739 0.175595 5.00618 0.488155C5.31496 0.800716 5.48844 1.22464 5.48844 1.66667V18.3333C5.48844 18.7754 5.31496 19.1993 5.00618 19.5118C4.69739 19.8244 4.27859 20 3.84191 20H1.64653C1.20984 20 0.791042 19.8244 0.482258 19.5118C0.173473 19.1993 0 18.7754 0 18.3333V1.66667C0 1.22464 0.173473 0.800716 0.482258 0.488155C0.791042 0.175595 1.20984 0 1.64653 0H3.84191ZM10.428 0C10.8647 0 11.2835 0.175595 11.5923 0.488155C11.9011 0.800716 12.0746 1.22464 12.0746 1.66667V18.3333C12.0746 18.7754 11.9011 19.1993 11.5923 19.5118C11.2835 19.8244 10.8647 20 10.428 20H8.23266C7.79597 20 7.37717 19.8244 7.06838 19.5118C6.7596 19.1993 6.58612 18.7754 6.58612 18.3333V1.66667C6.58612 1.22464 6.7596 0.800716 7.06838 0.488155C7.37717 0.175595 7.79597 0 8.23266 0H10.428ZM18.4203 3.47111L21.9483 17.3811C22.002 17.5931 22.014 17.8138 21.9836 18.0305C21.9531 18.2472 21.8808 18.4557 21.7707 18.6441C21.6606 18.8325 21.5149 18.9971 21.342 19.1285C21.169 19.2599 20.9722 19.3556 20.7628 19.41L18.7035 19.9433C18.494 19.9978 18.2761 20.0099 18.062 19.9791C17.8479 19.9482 17.6419 19.875 17.4558 19.7636C17.2696 19.6521 17.107 19.5047 16.9772 19.3296C16.8474 19.1546 16.7529 18.9554 16.6991 18.7433L13.1712 4.83778C13.1174 4.62577 13.1054 4.40511 13.1358 4.1884C13.1663 3.97169 13.2387 3.76318 13.3487 3.57478C13.4588 3.38638 13.6045 3.22177 13.7774 3.09035C13.9504 2.95894 14.1472 2.8633 14.3567 2.80889L16.4159 2.27222C16.8389 2.16288 17.2874 2.22781 17.6632 2.45277C18.0389 2.67773 18.3112 3.04435 18.4203 3.47222V3.47111Z" fill="#C5A45B"/>
                            </svg>
                            <span>My Library</span>
                        </SettingsButton>
                    </SettingsElement>
                    <SettingsElement>
                        <SettingsButton onClick={() => navigateUser('/settings')}>
                            <svg width="20" height="23" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.8143 30.9208H12.1867C11.8341 30.9208 11.4921 30.8004 11.2173 30.5793C10.9426 30.3583 10.7517 30.05 10.6762 29.7056L10.047 26.7929C9.20756 26.4251 8.41162 25.9651 7.6738 25.4215L4.83372 26.3259C4.49756 26.4332 4.13484 26.4221 3.80579 26.2947C3.47675 26.1673 3.20118 25.9312 3.02486 25.6256L0.204883 20.754C0.030405 20.4481 -0.0350896 20.0921 0.0191143 19.7441C0.0733183 19.3961 0.244011 19.0768 0.503268 18.8385L2.70637 16.8286C2.60619 15.9182 2.60619 14.9995 2.70637 14.0891L0.503268 12.0838C0.243644 11.8454 0.0727189 11.5258 0.0185061 11.1775C-0.0357066 10.8292 0.0300092 10.4728 0.204883 10.1668L3.01867 5.29209C3.195 4.98646 3.47057 4.75034 3.79961 4.62295C4.12865 4.49555 4.49137 4.48453 4.82754 4.59173L7.66761 5.49617C8.04485 5.21788 8.43754 4.95815 8.8426 4.72315C9.23375 4.50361 9.63572 4.30417 10.047 4.12638L10.6778 1.21673C10.7528 0.872272 10.9434 0.563821 11.2179 0.342523C11.4923 0.121225 11.8341 0.000370997 12.1867 0H17.8143C18.1668 0.000370997 18.5087 0.121225 18.7831 0.342523C19.0575 0.563821 19.2481 0.872272 19.3232 1.21673L19.9602 4.12792C20.7985 4.49784 21.5942 4.95764 22.3333 5.49926L25.175 4.59483C25.5109 4.48802 25.8733 4.49924 26.202 4.62662C26.5307 4.75399 26.806 4.98989 26.9823 5.29518L29.7961 10.1698C30.1547 10.7991 30.0311 11.5953 29.4977 12.0854L27.2946 14.0952C27.3948 15.0057 27.3948 15.9244 27.2946 16.8348L29.4977 18.8447C30.0311 19.3363 30.1547 20.131 29.7961 20.7602L26.9823 25.6349C26.8059 25.9405 26.5304 26.1766 26.2013 26.304C25.8723 26.4314 25.5096 26.4424 25.1734 26.3352L22.3333 25.4308C21.5961 25.974 20.8006 26.4334 19.9617 26.8006L19.3232 29.7056C19.2478 30.0498 19.0571 30.3579 18.7827 30.5789C18.5083 30.7999 18.1666 30.9205 17.8143 30.9208ZM14.9943 9.27623C13.3542 9.27623 11.7812 9.92778 10.6214 11.0875C9.46168 12.2473 8.81013 13.8202 8.81013 15.4604C8.81013 17.1005 9.46168 18.6735 10.6214 19.8332C11.7812 20.993 13.3542 21.6445 14.9943 21.6445C16.6344 21.6445 18.2074 20.993 19.3671 19.8332C20.5269 18.6735 21.1784 17.1005 21.1784 15.4604C21.1784 13.8202 20.5269 12.2473 19.3671 11.0875C18.2074 9.92778 16.6344 9.27623 14.9943 9.27623Z" fill="#C4A35A"/>
                            </svg>
                            <span>Settings</span>
                        </SettingsButton>
                    </SettingsElement>
                    <SettingsElement>
                        <SettingsButton>
                            <svg width="20" height="23" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0ZM15 27.8571V2.14286C16.6884 2.14286 18.3603 2.47542 19.9202 3.12155C21.4801 3.76768 22.8975 4.71473 24.0914 5.90863C25.2853 7.10252 26.2323 8.51988 26.8785 10.0798C27.5246 11.6397 27.8571 13.3116 27.8571 15C27.8571 16.6884 27.5246 18.3603 26.8785 19.9202C26.2323 21.4801 25.2853 22.8975 24.0914 24.0914C22.8975 25.2853 21.4801 26.2323 19.9202 26.8784C18.3603 27.5246 16.6884 27.8571 15 27.8571Z" fill="#C4A35A"/>
                            </svg>
                            <span>Theme</span>
                        </SettingsButton>
                    </SettingsElement>
                </SettingsList>
                <Divider/>
                <SettingsButton onClick={() => navigateUser('/logout')}>
                    <svg width="20" height="23" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 4.03867C0 1.80932 1.80932 0 4.03867 0H9.80819C10.2672 6.84041e-09 10.7075 0.182358 11.0321 0.506956C11.3567 0.831555 11.539 1.27181 11.539 1.73086C11.539 2.18991 11.3567 2.63016 11.0321 2.95476C10.7075 3.27936 10.2672 3.46171 9.80819 3.46171H4.03867C3.88565 3.46171 3.7389 3.5225 3.6307 3.6307C3.5225 3.7389 3.46171 3.88565 3.46171 4.03867V28.2707C3.46171 28.5891 3.72019 28.8476 4.03867 28.8476H9.80819C10.2672 28.8476 10.7075 29.03 11.0321 29.3546C11.3567 29.6792 11.539 30.1194 11.539 30.5785C11.539 31.0375 11.3567 31.4778 11.0321 31.8024C10.7075 32.127 10.2672 32.3093 9.80819 32.3093H4.03867C2.96755 32.3093 1.9403 31.8838 1.1829 31.1264C0.425501 30.369 0 29.3418 0 28.2707V4.03867ZM24.0935 14.4238H10.9621C10.503 14.4238 10.0628 14.6062 9.73819 14.9308C9.4136 15.2554 9.23124 15.6956 9.23124 16.1547C9.23124 16.6137 9.4136 17.054 9.73819 17.3786C10.0628 17.7032 10.503 17.8855 10.9621 17.8855H24.0935L19.5471 22.4319C19.3771 22.5904 19.2407 22.7815 19.1461 22.9938C19.0515 23.2061 19.0006 23.4353 18.9965 23.6677C18.9924 23.9001 19.0352 24.1309 19.1222 24.3465C19.2093 24.562 19.3389 24.7578 19.5032 24.9221C19.6676 25.0865 19.8633 25.2161 20.0789 25.3031C20.2944 25.3902 20.5252 25.4329 20.7576 25.4288C20.99 25.4247 21.2192 25.3738 21.4316 25.2792C21.6439 25.1846 21.835 25.0482 21.9934 24.8782L29.4938 17.3778C29.8179 17.0533 30 16.6133 30 16.1547C30 15.696 29.8179 15.2561 29.4938 14.9315L21.9934 7.43115C21.835 7.26109 21.6439 7.12469 21.4316 7.03009C21.2192 6.93549 20.99 6.88462 20.7576 6.88052C20.5252 6.87642 20.2944 6.91917 20.0789 7.00623C19.8633 7.09328 19.6676 7.22285 19.5032 7.38721C19.3389 7.55157 19.2093 7.74735 19.1222 7.96287C19.0352 8.17839 18.9924 8.40924 18.9965 8.64165C19.0006 8.87405 19.0515 9.10324 19.1461 9.31556C19.2407 9.52788 19.3771 9.71897 19.5471 9.87743L24.0935 14.4238Z" fill="#C4A35A"/>
                    </svg>
                    <span>Log out</span>
                </SettingsButton>
            </ModalContent>
        </Modal>
    );
};

export default NavModal;