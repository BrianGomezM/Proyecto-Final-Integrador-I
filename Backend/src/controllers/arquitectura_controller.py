from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.arquitectura_model import Arquitectura
from flask_cors import CORS
from flask import Flask


#FIRMA DE LA CLASE ARQUITECTURA_CONTROLLER.PY
#La funcionalidad: Este código implementa un controlador para una API en Flask que permite realizar operaciones 
#CRUD (Crear, Leer, Actualizar, Eliminar) sobre construcciones egipcias. Proporciona endpoints para listar todas las construcciones,
#buscar una construcción por su código, registrar una nueva construcción, eliminar una construcción existente y 
#actualizar la información de una construcción.

# Crear el blueprint para el controlador de arquitectura
arquitectura_app = Blueprint('arquitectura_app', __name__)

#Método: GET
#Datos de entrada: No se requieren datos de entrada.
#Datos de salida: Devuelve un JSON con una lista de construcciones y un mensaje 
#indicando que se trata de una lista de construcciones egipcias. 
#En caso de error, devuelve un mensaje de error.
@arquitectura_app.route('/arquitectura/<correo>', methods=['GET'])
def listar_construcciones(correo):
    construcciones = Arquitectura.listar_construcciones(correo)
    if construcciones is not None:
        return jsonify({'construcciones': construcciones, 'mensaje': "Lista de construcciones egipcias"})
    else:
        return jsonify({"mensaje": "Error"})

#Método: GET
#Datos de entrada: El parámetro <codigo> representa el código de la construcción que se desea buscar.
#Datos de salida: Devuelve un JSON con los detalles de la construcción encontrada y un mensaje 
#indicando que se encontró la construcción. En caso de no encontrar la construcción,
#devuelve un mensaje indicando que no se encontró. .
@arquitectura_app.route('/arquitecturaf/<codigo>', methods=['GET'])
def buscar_construccion(codigo):
    construccion = Arquitectura.buscar_construccion(codigo)

    if construccion is not None:
        return jsonify({'construccion': construccion, 'mensaje': "Se encontró la construcción"})
    else:
        return jsonify({"mensaje": "No se encontró la construcción"})

#Método: POST
#Datos de entrada: Se espera un JSON en el cuerpo de la solicitud que contenga el campo 
#nombreConstruccion con el nombre de la construcción que se desea registrar.
#Datos de salida: Devuelve un JSON con un mensaje indicando que se registró correctamente la construcción. En caso de error, devuelve un mensaje de error."""
@arquitectura_app.route('/arquitectura', methods=['POST'])
def registrar_construccion():
    nombre_construccion = request.json.get('nombreConstruccion')

    if Arquitectura.registrar_construccion(nombre_construccion):
        return jsonify({"mensaje": "Se registró correctamente"})
    else:
        return jsonify({"mensaje": "Error"})

#Método: DELETE
#Datos de entrada: El parámetro <codigo> representa el código de la construcción que se desea eliminar.
#Datos de salida: Devuelve un JSON con un mensaje indicando que se eliminó correctamente la construcción.
#En caso de error, devuelve un mensaje de error al eliminar la construcción."""
@arquitectura_app.route('/arquitectura/<codigo>', methods=['DELETE'])
def eliminar_construccion(codigo):
    if Arquitectura.eliminar_construccion(codigo):
        return jsonify({"mensaje": "Construcción eliminada correctamente"})
    else:
        return jsonify({"mensaje": "Error al eliminar la construcción"})

#Método: PUT
#Datos de entrada: El parámetro <codigo> representa el código de la construcción que se desea actualizar. Se espera un 
#JSON en el cuerpo de la solicitud que contenga el campo nombreConstruccion con el nuevo nombre de la construcción.
#Datos de salida: Devuelve un JSON con un mensaje indicando que se actualizó correctamente la construcción. En caso de error,
#devuelve un mensaje de error al actualizar la construcción.
@arquitectura_app.route('/arquitectura/<codigo>', methods=['PUT'])
def actualizar_construccion(codigo):
    nombre_construccion = request.json.get('nombreConstruccion')

    if Arquitectura.actualizar_construccion(codigo, nombre_construccion):
        return jsonify({"mensaje": "Construcción actualizada correctamente"})
    else:
        return jsonify({"mensaje": "Error al actualizar la construcción"})
    
#Método: GET
#Datos de entrada: No se requieren datos de entrada.
#Datos de salida: Devuelve un JSON con una lista de imagenes 
#En caso de error, devuelve un mensaje de error.
@arquitectura_app.route('/arquitecturaIMG/<codigo>', methods=['GET'])
def listar_construccionesIMG(codigo):
    imagenes = Arquitectura.listar_construccionesIMG(codigo)
    if imagenes is not None:
        return jsonify({'construcciones': imagenes, 'mensaje': "Lista imagenes de construcciones egipcias"})
    else:
        return jsonify({"mensaje": "Error"})
    

#Método: GET
#Datos de entrada: No se requieren datos de entrada.
#Datos de salida: Devuelve un JSON con una lista de imagenes 
#En caso de error, devuelve un mensaje de error.
@arquitectura_app.route('/listarConstruE/<correo>', methods=['GET'])
def listarConstruE(correo):
    varlistarConstruE = Arquitectura.listarConstruE(correo)
    if varlistarConstruE is not None:
        return jsonify({'construcciones': varlistarConstruE, 'mensaje': "Lista imagenes de construcciones egipcias"})
    else:
        return jsonify({"mensaje": "Error"})