from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.usuario import Usuario
from flask_cors import CORS
from flask import Flask

# Crear el blueprint para el controlador de login
usuario_app = Blueprint('registrarUsuario', __name__)

# Método: POST
# Datos de entrada: Se espera un JSON en el cuerpo de la solicitud que contenga el campo
# Datos de salida: Devuelve un JSON con un mensaje indicando que se registró correctamente usuario. En caso de error, devuelve un mensaje de error.
@usuario_app.route('/registrar_usuario', methods=['POST'])
def login_endpoint():

    if Usuario.registrar_usuario():
        return jsonify({"mensaje": "Se registró correctamente"})
    else:
        return jsonify({"mensaje": "Error"})