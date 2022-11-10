import React, {useState, useEffect} from "react";
import styled from "styled-components"
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {FormSubmit, FormError, SliderInput} from "../styles/UILibrary";
import image from "../assets/images/greeting-image.jpg";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import {UserImageProps} from "../types/IProps";
import {updateUserInfo} from "../store/actions/UserActionCreators";

const ProfilePageBlock = styled.div``;
const BannerBlock = styled.div`
  background-image: url(${image});
  background-size: cover;
  background-position-y: 50%;
  width: 100%;
  height: 210px;
  border-radius: 5px;
  margin-bottom: 40px;
`;
const Heading = styled.h2`
  display: block;
  font-size: 42px;
  color: #FFFFFF;
  padding: 10px 25px;
  
  span {
    font-size: 14px;
    margin-left: 10px;
    font-weight: normal;
    color: rgba(255,255,255,0.5)
  }
`;
const ActivationStatus = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;
const UserForm = styled.form`
  display: flex;
  @media (max-width: 575px) {
    flex-direction: column;
  }
`;
const ImageBlock = styled.div`
  width: 160px;
  margin-right: 40px;
`;
const UserImage = styled.img<UserImageProps>`
  width: 160px;
  height: 160px;
  object-fit: cover;
`;
const SendImageInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const ChooseImageBtn = styled.label`
  display: block;
  width: 100%;
  padding: 5px 0;
  margin: 5px 0 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.main};
  cursor: pointer;
  text-align: center;
  transition: .2s;
  &:hover{
    background-color: ${(props) => props.theme.darkSecondary};
  }
`;
const UserDataBlock = styled.div`
  width: 100%;
  max-width: 500px;
  span {
    font-size: 14px;
    color: ${(props) => props.theme.text};
  }
  @media (max-width: 575px) {
    max-width: none;
  }
`;
const LabelInput = styled.label`
  display: block;
  color: ${(props) => props.theme.secondary};
  font-size: 12px;
  margin-bottom: 5px;
`;
const TextInput = styled.input`
  margin-bottom: 15px;
  width: 100%;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.form};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
`;
const NumInput = styled.input`
  border: none;
  border-radius: 5px;
  text-align: center;
  width: 60px;
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.text};
`;

const SettingsPage = () => {
    const {id, is_activated, avatar, user_name, status, daily_goal} = useAppSelector(state => state.user.userInfo);
    const dispatch = useAppDispatch();

    const [file, setFile] = useState<Blob | null>(null);
    const [tmpAvatar, setTmpAvatar] = useState<(string & ArrayBuffer) | string | null>(null);
    const [newName, setNewName] = useState<string | undefined>("");
    const [newStatus, setNewStatus] = useState<string | undefined>("");
    const [newGoal, setNewGoal] = useState<number | undefined>(0);
    const [activationError, setActivationError] = useState<string>("");

    useEffect(() => {
        setNewName(user_name);
        setNewStatus(status);
        setNewGoal(daily_goal!/60);
    }, [user_name, status, daily_goal]);
    const setUploadedFile = (image: Blob) => {
        setFile(image);
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", () => {
            setTmpAvatar(String(reader.result));
        });
    };
    const formHandler = async (e: any) => {
        e.preventDefault();
        if (is_activated === false) {
            setActivationError("Account is not activated.");
            return false;
        }
        try {
            if (file) {
                const data = new FormData();
                data.append("avatar", file);
                await UserService.updateImage(data);
            }
            await dispatch(updateUserInfo(newName, newStatus, newGoal!*60));
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };
    const sendActivationLink = async () => {
        const response = await AuthService.sendActivationLink();
        alert(response.data.message);
    }

    return (
        <ProfilePageBlock>
            <BannerBlock>
                <Heading>
                    Settings
                    <span>User ID: {id}</span>
                    {!is_activated && <ActivationStatus onClick={sendActivationLink}>Account is not activated.</ActivationStatus>}
                </Heading>
            </BannerBlock>
            <UserForm encType="multipart/form-data" onSubmit={(e)=>formHandler(e)}>
                <ImageBlock>
                    <UserImage src={tmpAvatar || avatar} alt="Profile Image"/>
                    <SendImageInput
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={(e) => setUploadedFile(e.target.files![0])}
                        accept={".png, .jpeg, .jpg"}
                    />
                    <ChooseImageBtn htmlFor="avatar">Choose avatar</ChooseImageBtn>
                </ImageBlock>
                <UserDataBlock>
                    <LabelInput>Name</LabelInput>
                    <TextInput
                        type="text"
                        name="name"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                    />
                    <LabelInput>Status</LabelInput>
                    <TextInput
                        type="text"
                        name="status"
                        value={newStatus}
                        onChange={e => setNewStatus(e.target.value)}
                    />
                    <LabelInput>Reading daily goal (min. a day)</LabelInput>
                    <SliderInput
                        type="range"
                        min={0}
                        max={1440}
                        step={5}
                        value={newGoal}
                        width={"80%"}
                        onChange={e => setNewGoal(Number(e.target.value))}
                    />
                    <NumInput
                        type="number"
                        name="reading-goal"
                        value={newGoal}
                        onChange={e => setNewGoal(Number(e.target.value))}
                        min={0}
                        max={1440}
                    />
                    <FormSubmit type="submit">Save</FormSubmit>
                    {activationError && <FormError>{activationError}</FormError>}
                </UserDataBlock>
            </UserForm>
        </ProfilePageBlock>
    );
};

export default SettingsPage;
