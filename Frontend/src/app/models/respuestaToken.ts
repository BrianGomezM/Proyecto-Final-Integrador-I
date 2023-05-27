import { Token } from './token';

export class RespuestaToken{
    respuesta:Token = new Token(0, "", "", new Date());

    constructor(token:Token){
        this.respuesta = token;
    }
}