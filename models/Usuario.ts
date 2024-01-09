import {UsuarioLoginReqDTO} from "./UsuarioLoginDTO";

export type Usuario = {
    idBanner: string,
    nombre: string,
    carrera: string
}

export type SignInViewModelType = {
    isLoading: boolean,
    usuario: UsuarioLoginReqDTO,
    handleSignIn: () => void,
    handleIdBannerChange: (idBanner: string) => void,
    handleContraseniaChange: (contrasenia: string) => void,
}