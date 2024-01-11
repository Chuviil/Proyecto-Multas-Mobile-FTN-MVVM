export type Usuario = {
    idBanner: string,
    nombre: string,
    carrera: string
}

export type UsuarioLoginReqDTO = {
    idBanner: string,
    contrasenia: string,
}

export type UsuarioLoginResDTO = {
    token: string,
    user: {
        IdBanner: string,
        Nombre: string,
        Carrera: string
    },
}

export type SignInViewModelType = {
    isLoading: boolean,
    usuario: UsuarioLoginReqDTO,
    handleSignIn: () => void,
    handleIdBannerChange: (idBanner: string) => void,
    handleContraseniaChange: (contrasenia: string) => void,
}
