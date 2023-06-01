from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.usuario import Usuario
from flask_cors import CORS
from flask import Flask



# Crear el blueprint para el controlador de login
usuario_app = Blueprint('registrarUsuario', __name__)
CORS(usuario_app)
# Método: POST
# Datos de entrada: Se espera un JSON en el cuerpo de la solicitud que contenga el campo
# Datos de salida: Devuelve un JSON con un mensaje indicando que se registró correctamente usuario. En caso de error, devuelve un mensaje de error.
@usuario_app.route('/registrar_usuario', methods=['POST'])
def registrar_usuario():

    if Usuario.registrar_usuario():
        return jsonify({"mensaje": "Se registró correctamente"})
    else:
        return jsonify({"mensaje": "Error"})
    
# Método: PUT
#Datos de entrada: El parámetro <codigo> representa el código de la construcción que se desea actualizar. Se espera un 
#JSON en el cuerpo de la solicitud que contenga el campo nombreConstruccion con el nuevo nombre de la construcción.
#Datos de salida: Devuelve un JSON con un mensaje indicando que se actualizó el usuario correctamente. En caso de error,
#devuelve un mensaje de error al actualizar el usuario.
# @usuario_app.route('/modificar_usuario', methods=['PUT'])
# def modificar_usuario():

#     if Usuario.modificar_usuario():
#         return jsonify({"mensaje": "El usuario se actualizó correctamente"})
#     else:
#         return jsonify({"mensaje": "Error, no se puedo actualizar"})
    
#Método: GET
#Datos de entrada: No se requieren datos de entrada.
#Datos de salida: Devuelve un JSON con una lista de usuarios y un mensaje 
#indicando que se trata de una lista de usuarios. 
#En caso de error, devuelve un mensaje de error.
@usuario_app.route('/listar_usuarios', methods=['GET'])
def listar_usuarios():

    usuarios = Usuario.listar_usuarios()

    if usuarios is not None:
        return jsonify({'usuarios': usuarios, 'mensaje': "Lista de usuarios satisfactoria"})
    else:
        return jsonify({"mensaje": "Error"})