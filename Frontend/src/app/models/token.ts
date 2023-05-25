export class Token{
    idUsuario:number = 0;
    token:string = '';
    valida:string = 'N';

    constructor(id_usuario:number, token:string, valida:string) {
        this.token = token;
        this.idUsuario = id_usuario;
        this.valida = valida;
    }
}