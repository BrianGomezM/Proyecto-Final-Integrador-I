from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
#from config import config
from models.login import Login
from flask_cors import CORS
from flask import Flask

# Crear el blueprint para el controlador de login
login_app = Blueprint('login_app', __name__)

CORS(login_app)
# Método: POST
# Datos de entrada: Se espera un JSON en el cuerpo de la solicitud que contenga el campo
# nombreConstruccion con el nombre de la construcción que se desea registrar.
# Datos de salida: Devuelve un JSON con un mensaje indicando que se registró correctamente la construcción. En caso de error, devuelve un mensaje de error.
@login_app.route('/login', methods=['POST'])
def login_endpoint():
    
    return Login.login()