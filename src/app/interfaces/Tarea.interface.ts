export interface Tarea {
    idTarea:number;
    nombreTarea:    string;
    contenidoTarea: string;
    fechaRegistro:  Date;
    fechaFinaliza:  Date;
    estado:         number;
    nameUser:       string[];
    usuarios?:      Desarrolladores[];
}

export interface Desarrolladores{
apellido: string;
email: string;
estado: number;
id: number;
nombre: string;
password:string;
username: string;
}