/**
 * Interfaz que representa las prácticas religiosas que viene de la base de datos.
 * 
 */

export interface Practicas{
    cod?:               number;
    nombre:             string;
    descripcion:        string;
    contenido:          string;
    imagen:             string;
    diosesRelacionados: string;
}