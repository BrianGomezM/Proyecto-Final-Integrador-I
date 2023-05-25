export class Usuario{

    id:number=0;
    constructor(
        public nombre:string='',
        public apellido:string='',
        public telefono:string='',
        public correo:string='',
        public password:string='' ,
        public urlAvatar:string=''
    ){

    }
}