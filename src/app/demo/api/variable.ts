export interface NameSw {
    nombre: string;
    version: string;
    nombre_completo: string;
    mensaje: string;
    mensaje_ol_c: string;
}

export interface DataLogin {
    user: string;
    pass: string;
    mail: string;
}

export interface DataValueEmail {
    mail: string,
}

export interface DataOptNumberVale {
    num1: string;
    num2: string;
    num3: string;
    num4: string;
}

export interface DataOptSend{
    idUsuario:number;
    tokenUsuario:string;
}

export interface DataSendEmail {
    id_usuario:number;
    nombres: string;
    apellidos:string;
    email: string;
}

export interface DataSendChangePassword{
    id_usuario: number,
    contrasena: string,
    Recontrasena: string,
}