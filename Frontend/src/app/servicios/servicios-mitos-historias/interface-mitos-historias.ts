/**
 * Interfaz que representa las historias y mito relacionados con los dioses que viene de la base de datos.
 * 
 */

export interface MitosHistorias{
    cod?:               number;
    titulo:             string;
    descripcion:        string;
    contenido:          string;
    imagen:             string;
    categoria:          string;
    diosesRelacionados: string;
    estado:             boolean;

}






