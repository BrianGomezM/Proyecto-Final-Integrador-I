from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS
from flask import Flask, jsonify, request
from datetime import datetime


# Configuración de la conexión a la base de datos MySQL
app = Flask(__name__)
CORS(app)
app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB

# Configuración de la conexión a la base de datos MySQL
mysql = MySQL(app)


class Usuario:
    @staticmethod
    def registrar_usuario():
        usuario = request.get_json()  # Obtener los datos enviados desde el frontend
        resultado = Usuario.guardar_usuario(usuario)  # Guardar los datos en la base de datos

        return jsonify(resultado)

    @staticmethod
    def guardar_usuario(usuario):
        try:
            if 'nombre' not in usuario:
                raise Exception("'nombre' no está presente en los datos del usuario")
            conn = mysql.connect()  # Establecer la conexión a la base de datos
            cursor = conn.cursor()
            
            sql = "SELECT correo FROM usuario WHERE correo = %s"
            cursor.execute(sql, (usuario['correo'],))
            resultado = cursor.fetchone()
            if resultado:
                raise Exception("El correo electrónico ya está registrado")

            # Insertar los datos del usuario en la base de datos
            sql = "INSERT INTO usuario (nombre, apellido, telefono, correo, password, urlAvatar, sexo) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            valores = (usuario['nombre'], usuario['apellido'], usuario['telefono'], usuario['correo'], usuario['password'], usuario['urlAvatar'], usuario['sexo'])
            cursor.execute(sql, (valores))


            conn.commit()  # Confirmar los cambios en la base de datos
            conn.close()  # Cerrar la conexión a la base de datos

            return {'mensaje': 'El usuario se registró correctamente'}
        except Exception as ex:
            return {'mensaje': str(ex)}


