from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.practicas_model import Practicas
from flask_cors import CORS
from flask import Flask

practicas_app = Blueprint('practicas_app', __name__)

###################################################################################################
# Método: listarMitosHistorias
# Descripción:
# Este método se utiliza para obtener una lista de todos los mitos e historias.
# Realiza una consulta a la base de datos para obtener los datos de todos los dioses
# y los devuelve como respuesta en formato JSON.
#
# URL: /mitos-historias
#
# Método HTTP: GET
###################################################################################################
@practicas_app.route('/practicas', methods=['GET'])
def listarMitosHistorias():
    practicas = Practicas.listarPracticas()

    if practicas is not None:
        return jsonify({'practicas_religiosas': practicas, 'mensaje': "Lista de prácticas"})
    else:
        return jsonify({"mensaje": "Error"})
    
    ###################################################################################################
# Método: getPracticasImgById
# Descripción:
# Este método se utiliza para obtener las imágenes de un dios específico por su ID.
# Busca en la base de datos las imágenes asociadas al dios y las devuelve como
# respuesta en formato JSON.
#
# URL: /mpracticasImgById/<id>
#
# Método HTTP: GET
# Parámetros de URL: <id> (int): El ID del dios para el cual se desean obtener las imágenes.
###################################################################################################

@practicas_app.route('/getPracticasImgById/<id>', methods=['GET'])
def getPracticasImgById(id):
    imagenes = Practicas.getPracticasImgById(id)
    if imagenes is not None:
        return jsonify({'imagenes': imagenes, 'mensaje': "Lista de imagenes de prácticas religiosas"})
    else:
        return jsonify({"mensaje": "Error"})  
###################################################################################################
# Método: getMitosHistoriasById
# Descripción:
# Este método se utiliza para obtener los datos de un dios específico por su ID.
# Busca en la base de datos los campos asociados al dios y los devuelve como
# respuesta en formato JSON.
#
# URL: /mitosHistoriasById/<id>
#
# Método HTTP: GET
# Parámetros de URL: <id> (int): El ID del dios que se desea obtener.
###################################################################################################
@practicas_app.route('/getPracticasById/<id>', methods=['GET'])
def getPracticasById(id):
    practicas = Practicas.getPracticasById(id)
    if practicas is not None:
        return jsonify({'Proceso_construccion': practicas, 'mensaje': "Se encontró el proceso de construcción"})
    else:
        return jsonify({"mensaje": "Error"})  