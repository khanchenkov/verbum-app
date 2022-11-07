import React, {FC} from "react";
import {UploadBookModalProps} from "../types/IProps";
import {modalBackground as Modal} from "../styles/UILibrary";

const UploadBookModal: FC<UploadBookModalProps> = ({active, setActive}) => {

    const hideModal = () => {
        document.body.style.overflow = 'visible';
        document.body.style.paddingRight = '0px';
        setActive(false);
    };
    return (
        <Modal onClick={hideModal} active={active}>

        </Modal>
    );
};

export default UploadBookModal;
