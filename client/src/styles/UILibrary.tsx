import styled from "styled-components";

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