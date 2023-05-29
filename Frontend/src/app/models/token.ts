export class Token{
    idUsuario:number = 0;
    token:string = '';
    valida:string = 'N';
    fecha:Date = new Date()

    constructor(id_usuario:number, token:string, valida:string, fecha: Date) {
        this.token = token;
        this.idUsuario = id_usuario;
        this.valida = valida;
        this.fecha = fecha;
    }
}