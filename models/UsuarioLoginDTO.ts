import {Usuario} from "./Usuario";

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