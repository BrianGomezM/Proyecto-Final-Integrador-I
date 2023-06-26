export class Usuario{
    //Aquí se asigna los atributos que tendrá la clase usuario
    id:number=0;
    constructor(
        public nombre:string='',
        public apellido:string='',
        public telefono:string='',
        public correo:string='',
        public password:string='' ,
        public urlAvatar:string='',
        public sexo:string='',
        public estado:number=1
    ){

    }
}