import SignInView from "../views/SignInView";
import {useState} from "react";
import {useSession} from "../ctx";
import AxiosClient from "../AxiosClient";
import {AxiosResponse} from "axios";
import {router} from "expo-router";
import {Usuario, UsuarioLoginReqDTO, UsuarioLoginResDTO} from "../models/Usuario";

const SignInViewModel = () => {
    const {signIn} = useSession();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [usuario, setUsuario] = useState<UsuarioLoginReqDTO>({idBanner: "", contrasenia: ""});

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            const response: AxiosResponse<UsuarioLoginResDTO> = await AxiosClient.post("/Ayudante/login", usuario);
            const userToSave: Usuario = {
                nombre: response.data.user.Nombre,
                carrera: response.data.user.Carrera,
                idBanner: response.data.user.IdBanner
            }
            signIn(response.data.token, JSON.stringify(userToSave));
            router.replace("/");
        } catch (e) {
            alert("Error al iniciar sesión");
            console.log(e);
        } finally {
            setIsLoading(false)
        }
    }

    const handleIdBannerChange = (newIdBanner: string) => {
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            idBanner: newIdBanner,
        }));
    }

    const handleContraseniaChange = (newContrasenia: string) => {
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            contrasenia: newContrasenia,
        }));
    }

    const viewModel = {
        isLoading,
        handleSignIn,
        handleIdBannerChange,
        handleContraseniaChange,
        usuario
    }

    return <SignInView viewModel={viewModel}/>
}

export default SignInViewModel;
