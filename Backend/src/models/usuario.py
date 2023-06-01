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
    
    def listar_usuarios():
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM usuario"
            cursor.execute(sql)
            datos = cursor.fetchall()
            usuarios = []
            for fila in datos:
                usuario = {'id': fila[0], 'nombre': fila[1], 'apellido': fila[2], 'telefono': fila[3], 'correo': fila[4], 'password': fila[5], 'urlAvatar': fila[6], 'sexo': fila[7] , 'estado': fila[8]}
                usuarios.append(usuario)
            conn.close()
            return usuarios
        except Exception as ex:
            return None

    
    
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
            sql = "INSERT INTO usuario (nombre, apellido, telefono, correo, password, urlAvatar, sexo, estado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            valores = (usuario['nombre'], usuario['apellido'], usuario['telefono'], usuario['correo'], usuario['password'], usuario['urlAvatar'], usuario['sexo'], usuario['estado'])
            cursor.execute(sql, (valores))


            conn.commit()  # Confirmar los cambios en la base de datos
            conn.close()  # Cerrar la conexión a la base de datos

            return {'mensaje': 'El usuario se registró correctamente'}
        except Exception as ex:
            return {'mensaje': str(ex)}
        
    # @staticmethod
    # def modificar_usuario():
    #     usuario = request.get_json()  # Obtener los datos enviados desde el frontend
    #     resultado = Usuario.actualizar_usuario(usuario)  # Actualizar los datos en la base de datos

    #     return jsonify(resultado)

    # @staticmethod
    # def actualizar_usuario(usuario):
    #     try:
    #         if 'id' not in usuario:
    #             raise Exception("'id' no está presente en los datos del usuario")

    #         conn = mysql.connect()  # Establecer la conexión a la base de datos
    #         cursor = conn.cursor()

    #         # Verificar si el correo electrónico ya está registrado para otro usuario
    #         sql = "SELECT correo FROM usuario WHERE correo = %s AND id != %s"
    #         cursor.execute(sql, (usuario['correo'], usuario['id']))
    #         resultado = cursor.fetchone()
    #         if resultado:
    #             raise Exception("El correo electrónico ya está registrado para otro usuario")

    #         # Actualizar los datos del usuario en la base de datos
    #         sql = "UPDATE usuario SET nombre = %s, apellido = %s, telefono = %s, correo = %s, password = %s, urlAvatar = %s, sexo = %s, estado = %s WHERE id = %s"
    #         valores = (usuario['nombre'], usuario['apellido'], usuario['telefono'], usuario['correo'], usuario['password'], usuario['urlAvatar'], usuario['sexo'], usuario['estado'], usuario['id'])
    #         cursor.execute(sql, valores)

    #         conn.commit()  # Confirmar los cambios en la base de datos
    #         conn.close()  # Cerrar la conexión a la base de datos

    #         return {'mensaje': 'El usuario se actualizó correctamente'}
    #     except Exception as ex:
    #         return {'mensaje': str(ex)}



