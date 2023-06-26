from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.test_model import Test
from flask_cors import CORS
from flask import Flask




test_app = Blueprint('test_app', __name__)


@test_app.route('/listarPreguntas', methods=['GET'])
def listPreguntas():
    preguntas = Test.listar_preguntas()
    if preguntas is not None:
       return jsonify({'Preguntas': preguntas, 'mensaje': "Lista de preguntas"})
    else:
        return jsonify({"mensaje": "Error"})

@test_app.route('/listarPodio', methods=['GET'])
def listarPodio():
    podio = Test.listar_podio()

    if podio is not None:
        return jsonify({'Podio': podio, 'mensaje': "Podio"})
    else:
        return jsonify({"mensaje": "Error"})
    

@test_app.route('/registrarTest', methods=['POST'])
def registrar_test():
    usuario = request.json.get('usuario')
    calificacion = request.json.get('calificacion')
    horaI = request.json.get('horaI')
    horaF = request.json.get('horaF')
    if Test.insertarPodio(usuario, calificacion, horaI, horaF):
        return jsonify({"mensaje": "Se registró correctamente"})
    else:
        return jsonify({"mensaje": "Error"})
    
@test_app.route('/listUserTest/<codigo>', methods=['GET'])
def consultar_userTest(codigo):
    userTest = Test.consultar_userTest(codigo)
    if userTest is not None:
        return jsonify({'userTest': userTest, 'mensaje': "Usuario test"})
    else:
        return jsonify({"mensaje": "Error"})
