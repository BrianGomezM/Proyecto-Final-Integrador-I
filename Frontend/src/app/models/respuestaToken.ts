import { Token } from './token';

export class RespuestaToken{
    respuesta:Token = new Token(0, "", "");

    constructor(token:Token){
        this.respuesta = token;
    }
}