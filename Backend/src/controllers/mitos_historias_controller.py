from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.mitos_historias_model import MitosHistorias
from flask_cors import CORS
from flask import Flask

mitos_historias_app = Blueprint('mitos_historias_app', __name__)

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
@mitos_historias_app.route('/mitos-historias', methods=['GET'])
def listarMitosHistorias():
    mitos_historias = MitosHistorias.listarMitosHistorias()

    if mitos_historias is not None:
        return jsonify({'mitos_historias': mitos_historias, 'mensaje': "Lista de mitos_historias egipcios"})
    else:
        return jsonify({"mensaje": "Error"})
    
###################################################################################################
# Método: getMitosHistoriasImgById
# Descripción:
# Este método se utiliza para obtener las imágenes de un dios específico por su ID.
# Busca en la base de datos las imágenes asociadas al dios y las devuelve como
# respuesta en formato JSON.
#
# URL: /mitosHistoriasImgById/<id>
#
# Método HTTP: GET
# Parámetros de URL: <id> (int): El ID del dios para el cual se desean obtener las imágenes.
###################################################################################################

@mitos_historias_app.route('/getMitosHistoriasById/<id>', methods=['GET'])
def getMitosHistoriasById(id):
    imagenes = MitosHistorias.getMitosHistoriasImgById(id)
    if imagenes is not None:
        return jsonify({'imagenes': imagenes, 'mensaje': "Lista de imagenes de mitos e historias"})
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
@mitos_historias_app.route('/mitosHistoriasById/<id>', methods=['GET'])
def getGodById(id):
    mitos_historias = MitosHistorias.getMitosHistoriasById(id)
    if mitos_historias is not None:
        return jsonify({'Mito-historia': mitos_historias, 'mensaje': "Se encontro el Dios"})
    else:
        return jsonify({"mensaje": "Error"}) 

