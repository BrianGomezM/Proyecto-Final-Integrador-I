from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.proceso_construcciones_model import ProcesoConstrucciones
from flask_cors import CORS
from flask import Flask

proceso_construcciones_app = Blueprint('proceso_construcciones_app', __name__)

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
@proceso_construcciones_app.route('/proceso_construcciones', methods=['GET'])
def listarMitosHistorias():
    proceso_construcciones = ProcesoConstrucciones.listarProcesoConstrucciones()

    if proceso_construcciones is not None:
        return jsonify({'proceso_construcciones': proceso_construcciones, 'mensaje': "Lista de herramientas egipcios"})
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

@proceso_construcciones_app.route('/getProcesoConstruccionesImgById/<id>', methods=['GET'])
def getProcesoConstruccionesImgById(id):
    imagenes = ProcesoConstrucciones.getProcesoConstruccionesImgById(id)
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
@proceso_construcciones_app.route('/getProcesoConstruccionesById/<id>', methods=['GET'])
def getProcesoConstruccionesById(id):
    proceso_construcciones = ProcesoConstrucciones.getProcesoConstruccionesById(id)
    if proceso_construcciones is not None:
        return jsonify({'Proceso_construccion': proceso_construcciones, 'mensaje': "Se encontró el proceso de construcción"})
    else:
        return jsonify({"mensaje": "Error"}) 

























