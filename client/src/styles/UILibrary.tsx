import styled from "styled-components";
import {ModalBg} from "../types/IStyled";

export const colors = {
    lightMode: {
        main: "#efeee4",
        secondary: "#C5A45B",
        border: "#dadada",
        borderLight: "#EBEBEB",
        darkSecondary: "#bd9845",
        text: "#1E1E1E",
        form: "#F7F7F4",
        loadingBg: "rgba(239, 238, 228, 0.5)"
    },
    darkMode: {
        main: "#1E1E1E",
        secondary: "#C5A45B",
        border: "#252525",
        borderLight: "#141414",
        darkSecondary: "#bd9845",
        text: "#FFFFFF",
        form: "#08080b",
        loadingBg: "rgba(16, 17, 27, 0.5)"
    }
};

export const Container = styled.div`
  margin: 0 auto;
  width: calc(300px + (1140 - 300) * ((100vw - 320px) / (1440 - 320)));
`;
export const SignUpButton = styled.button`
  display: block;
  color: ${(props) => props.theme.main};
  text-decoration: none;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  width: 100px;
  padding: 4%;
  background-color: ${(props) => props.theme.secondary};
  cursor: pointer;
  transition: .2s;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
  @media (max-width: 575px) {
    font-size: 12px;
    width: 80px;
  }
  &:hover{
    background-color: ${(props) => props.theme.darkSecondary};
  }
`;
export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.theme.border};
  margin: 5px 0 15px;
`;
export const FormInput = styled.input`
  width: 100%;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.form};
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  margin-bottom: 20px;
`;
export const FormError = styled.span`
  display: block;
  font-size: 12px;
  color: red;
  margin-bottom: 10px;
`;
export const FormLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.darkSecondary};
  font-size: 12px;
  margin-bottom: 5px;
`;
export const FormSubmit = styled.button`
  width: 100%;
  height: 35px;
  margin: 5px 0 15px;
  border-radius: 5px;
  font-size: 14px;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.main};
  border: none;
  cursor: pointer;
  transition: .2s;
  &:hover{
    background-color: ${(props) => props.theme.darkSecondary};
  }
`;
export const FormBlock = styled.div`
  width: 300px;
  margin: 125px auto 0;
`;
export const FormHeading = styled.h1`
  color: ${(props) => props.theme.text};
  text-align: center;
  font-size: 50px;
`;
export const modalBackground = styled.div<ModalBg>`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.loadingBg};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  opacity: 0;
  transition: .2s;
  pointer-events: none;
  z-index: 9999;
  ${({ active }) => active && `
    opacity: 1;
    pointer-events: all;
  `}
`;
export const SettingsElement = styled.li`
  margin-bottom: 20px;
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