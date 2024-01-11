import React, {useState} from 'react';
import PerfilView from "../../../views/PerfilView";
import {useSession} from "../../../ctx";
import AxiosClient from "../../../AxiosClient";

const PerfilViewModel = () => {
    const {session, user, signOut} = useSession();
    const [changePasswordModalVisible, setChangePasswordModalVisible] =
        useState<boolean>(false);
    const [changingPassword, setChangingPassword] =
        useState<boolean>(false);
    const [nuevaContrasenia, setNuevaContrasenia] =
        useState<string>("");
    const [nuevaContraseniaConfirmation, setNuevaContraseniaConfirmation] =
        useState<string>("");

    const handleLogout = () => {
        signOut();
    }

    const handlePasswordChange = () => {
        setChangingPassword(true);
        if (nuevaContrasenia.length === 0 || nuevaContraseniaConfirmation.length === 0) {
            setChangingPassword(false);
            alert("Los campos de contraseña son obligatorios");
            return;
        }
        if (nuevaContrasenia !== nuevaContraseniaConfirmation) {
            setChangingPassword(false);
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            AxiosClient.put(
                `/Ayudante/${user.idBanner}`,
                {contrasenia: nuevaContrasenia},
                {headers: {Authorization: `Bearer ${session}`}})
                .then(() => {
                        alert("Contraseña actualizada correctamente");
                    }
                )
            hideChangePasswordModal();
        } catch (e) {
            console.log(e);
        } finally {
            setChangingPassword(false);
        }
    }

    const showChangePasswordModal = () => {
        setChangePasswordModalVisible(true);
    }

    const hideChangePasswordModal = () => {
        setChangePasswordModalVisible(false);
    }

    const handleNuevaContrasenia = (nuevaContrasenia: string) => {
        setNuevaContrasenia(nuevaContrasenia);
    }

    const handleNuevaContraseniaConfirmation = (nuevaContraseniaConfirmation: string) => {
        setNuevaContraseniaConfirmation(nuevaContraseniaConfirmation);
    }

    const viewModel = {
        user,
        handleLogout,
        showChangePasswordModal,
        hideChangePasswordModal,
        changePasswordModalVisible,
        changingPassword,
        handleNuevaContrasenia,
        handleNuevaContraseniaConfirmation,
        handlePasswordChange,
    }

    if (!user) return null;

    return <PerfilView viewModel={viewModel}/>;
};

export default PerfilViewModel;