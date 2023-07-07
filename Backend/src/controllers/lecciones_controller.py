from flask import Blueprint, jsonify, request
from flaskext.mysql import MySQL
from config import config
from models.lecciones_model import Lecciones
from flask_cors import CORS
from flask import Flask


lecciones_app = Blueprint('lecciones_app', __name__)


@lecciones_app.route('/leccionesVistas/<correoUsuario>/<idTabla>', methods=['GET'])
def listarLecciones(correoUsuario,idTabla):
    lecciones = Lecciones.getLecciones(correoUsuario,idTabla)
    if lecciones is not None:
        return jsonify({'Lecciones': lecciones, 'mensaje': "Lista de lecciones vistar por usuario"})
    else:
        return jsonify({"mensaje": "Error"})
    
@lecciones_app.route('/registrar_leccion', methods=['POST'])
def registrar_leccion():
    try:
        leccion = request.get_json()  # Obtener los datos enviados desde el frontend
        resultado = Lecciones.registrar_leccion(leccion)  # Guardar los datos en la base de datos

        return jsonify(resultado)
    except Exception as ex:
        print(f"Error en registrar leccion: {str(ex)}")
        return jsonify({"mensaje": "Error"})
    
@lecciones_app.route('/listarPinturasL/<correo>', methods=['GET'])
def listarPinturasL(correo):
    varlistarConstruE = Lecciones.listarPinturasL(correo)
    if varlistarConstruE is not None:
        return jsonify({'pinturas': varlistarConstruE, 'mensaje': "Lista imagenes de construcciones egipcias"})
    else:
        return jsonify({"mensaje": "Error"})


