from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.dioses_model import Dioses
from flask_cors import CORS
from flask import Flask

dioses_app = Blueprint('dioses_app', __name__)

###################################################################################################
# Método: listarDioses
# Descripción:
# Este método se utiliza para obtener una lista de todos los dioses egipcios.
# Realiza una consulta a la base de datos para obtener los datos de todos los dioses
# y los devuelve como respuesta en formato JSON.
#
# URL: /dioses
#
# Método HTTP: GET
###################################################################################################
@dioses_app.route('/dioses', methods=['GET'])
def listarDioses():
    dioses = Dioses.listarDioses()

    if dioses is not None:
        return jsonify({'dioses': dioses, 'mensaje': "Lista de dioses egipcios"})
    else:
        return jsonify({"mensaje": "Error"})
    
###################################################################################################
# Método: getDiosesImgById
# Descripción:
# Este método se utiliza para obtener las imágenes de un dios específico por su ID.
# Busca en la base de datos las imágenes asociadas al dios y las devuelve como
# respuesta en formato JSON.
#
# URL: /diosesImgById/<id>
#
# Método HTTP: GET
# Parámetros de URL: <id> (int): El ID del dios para el cual se desean obtener las imágenes.
###################################################################################################

@dioses_app.route('/diosesImgById/<id>', methods=['GET'])
def getDiosesImgById(id):
    imagenes = Dioses.getDiosesImgById(id)
    if imagenes is not None:
        return jsonify({'imagenes': imagenes, 'mensaje': "Lista de imagenes dios egipcio"})
    else:
        return jsonify({"mensaje": "Error"})   

###################################################################################################
# Método: getGodById
# Descripción:
# Este método se utiliza para obtener los datos de un dios específico por su ID.
# Busca en la base de datos los campos asociados al dios y los devuelve como
# respuesta en formato JSON.
#
# URL: /diosesById/<id>
#
# Método HTTP: GET
# Parámetros de URL: <id> (int): El ID del dios que se desea obtener.
###################################################################################################
@dioses_app.route('/diosesById/<id>', methods=['GET'])
def getGodById(id):
    dioses = Dioses.getGodById(id)
    if dioses is not None:
        return jsonify({'Dios': dioses, 'mensaje': "Se encontro el Dios"})
    else:
        return jsonify({"mensaje": "Error"}) 


@dioses_app.route('/filtrarDioses/<id>', methods=['GET'])
def filtrarDioses(id):
    dioses = Dioses.filtrarDioses(id)
    if dioses is not None:
        return jsonify({'dioses': dioses, 'mensaje': "Lista de dioses egipcios"})
    else:
        return jsonify({"mensaje": "Error"})
    