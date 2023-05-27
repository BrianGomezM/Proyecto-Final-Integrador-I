from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.criaturas_model import Criaturas
from flask_cors import CORS
from flask import Flask

criaturas_app = Blueprint('criaturas_app', __name__)

###################################################################################################
# Método: listarCriaturas
# Descripción:
# Este método se utiliza para obtener una lista de todas las criaturas egipcias.
# Realiza una consulta a la base de datos para obtener los datos de todas las criaturas
# y los devuelve como respuesta en formato JSON.
#
# URL: /criaturas
#
# Método HTTP: GET
###################################################################################################
@criaturas_app.route('/criaturas', methods=['GET'])
def listarDioses():
    dioses = Criaturas.listarCriaturas()
    if dioses is not None:
        return jsonify({'criaturas': dioses, 'mensaje': "Lista de criaturas egipcias"})
    else:
        return jsonify({"mensaje": "Error"})
    
###################################################################################################
# Método: getCriaturaById
# Descripción:
# Este método se utiliza para obtener los datos de una criatura específica por su ID.
# Busca en la base de datos los campos asociados a la criatura y los devuelve como
# respuesta en formato JSON.
#
# URL: /criaturasById/<id>
#
# Método HTTP: GET
# Parámetros de URL: <id> (int): El ID de la criatura que se desea obtener.
###################################################################################################
@criaturas_app.route('/criaturasById/<id>', methods=['GET'])
def getDiosesImgById(id):
    criatura = Criaturas.getCriaturaById(id)
    if criatura is not None:
        return jsonify({'criatura': criatura, 'mensaje': "Lista de imagenes de criaturas egipcias"})
    else:
        return jsonify({"mensaje": "Error"})   

###################################################################################################
# Método: getCriaturaImgById

# Descripción:
# Este método se utiliza para obtener las imágenes de una criatura específica por su ID. 
# Busca en la base de datos las imágenes asociadas a la criatura y las devuelve como 
# respuesta en formato JSON.

# URL: /criaturasImgById/<id>

# Método HTTP: GET
# Parámetros de URL: <id> (int): El ID de la criatura para la cual se desean obtener las imágenes.
###################################################################################################

@criaturas_app.route('/criaturasImgById/<id>', methods=['GET'])
def getGodById(id):
    imagenes = Criaturas.getCriaturaImgById(id)
    if imagenes is not None:
        return jsonify({'imagenes': imagenes, 'mensaje': "Se encontro la criatura"})
    else:
        return jsonify({"mensaje": "Error"}) 

