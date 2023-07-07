/**
 * Interfaz que representa a una criatura mitologica de la base de datos.
 */
export interface Criatura{
    cod?:      number;
    nombre:    string;
    historia:  string;
    representacion:   string;
    origen:string;
    caracteristicas:string;
    rol:string;
    imagen:string;
    estado:boolean;
}