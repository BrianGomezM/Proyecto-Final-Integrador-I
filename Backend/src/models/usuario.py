from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS
from flask import Flask, jsonify, request, url_for
from datetime import datetime
import os
import uuid
import base64


# Configuración de la conexión a la base de datos MySQL
app = Flask(__name__)
CORS(app)
app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB

# Configuración de la conexión a la base de datos MySQL
mysql = MySQL(app)


    
#ruta_imagenes = "/almacenamiento/imagenes"
#ruta_imagenes = os.path.abspath(os.path.join(os.path.dirname(_file_), "..", "almacenamiento", "imagenes"))
# ruta_proyecto = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))  # Ruta del directorio del proyecto
# ruta_imagenes = os.path.join(ruta_proyecto, "static", "imagenes")


# @staticmethod
# def crear_carpetas(ruta):
#     try:
#         partes = ruta.split("/")
#         ruta_carpeta = ""
#         for parte in partes:
#             if parte == "":
#                 continue

#             ruta_carpeta += "/" + parte

#             if not os.path.isdir(ruta_carpeta):
#                 os.mkdir(ruta_carpeta)
#     except Exception as ex:
#         print(f"Error en crear_carpetas: {str(ex)}")


# @staticmethod
# def obtener_datos_imagen(imagen, ruta):
#     try:
#         encabezado, contenido = imagen.split(",", 1)
#         extension = encabezado.split(";")
#         extension = extension[0].split("/")
#         nombre_archivo = str(uuid.uuid4()) + "." + extension[-1]
#         ruta_archivo = os.path.join(ruta, nombre_archivo)
#         return [ruta_archivo, contenido]
#     except Exception as ex:
#         print(f"Error en obtener_datos_imagen: {str(ex)}")
#         return None


# @staticmethod
# def guardar_imagen(imagen, contenido):
#     try:
#         ruta_archivo = os.path.join(app.static_folder, imagen)
#         with open(ruta_archivo, "wb") as archivo:
#             archivo.write(base64.b64decode(contenido))
#     except Exception as ex:
#         print(f"Error en guardar_imagen: {str(ex)}")


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
            print(f"Error en listar_usuarios: {str(ex)}")
            return None


    @staticmethod
    def registrar_usuario():
        try:
            usuario = request.get_json()  # Obtener los datos enviados desde el frontend
            resultado = Usuario.guardar_usuario(usuario)  # Guardar los datos en la base de datos

            return jsonify(resultado)
        except Exception as ex:
            print(f"Error en registrar_usuario: {str(ex)}")
            return None


    @staticmethod
    def guardar_usuario(usuario):
        try:
            if 'nombre' not in usuario:
                raise Exception("'nombre' no está presente en los datos del usuario")
            conn = mysql.connect()  # Establecer la conexión a la base de datos
            cursor = conn.cursor()


            #ruta_relativa = os.path.relpath(datos_imagen[0], ruta_proyecto)

            sql = "SELECT correo FROM usuario WHERE correo = %s"
            cursor.execute(sql, (usuario['correo'],))
            resultado = cursor.fetchone()
            if resultado:
                raise Exception("El correo electrónico ya está registrado")


            sql = "INSERT INTO usuario (nombre, apellido, telefono, correo, password, urlAvatar, sexo, estado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            valores = (usuario['nombre'], usuario['apellido'], usuario['telefono'], usuario['correo'], usuario['password'], usuario['urlAvatar'], usuario['sexo'], usuario['estado'])
            cursor.execute(sql, (valores))

            conn.commit()  # Confirmar los cambios en la base de datos
            conn.close()  # Cerrar la conexión a la base de datos

            return {'mensaje': 'El usuario se registró correctamente'}
        except Exception as ex:
            print(f"Error en guardar_usuario: {str(ex)}")
            return {'mensaje': str(ex)}

        
    @staticmethod
    # Este método recibe como parámetros el código de una construcción y el nuevo nombre que se desea asignar. 
    # Realiza una actualización en la base de datos para modificar el nombre de la construcción.
    #  Si la actualización se realiza correctamente, se devuelve True. En caso de error, se devuelve False.
    #Firma: @staticmethod def modificarUsuario(codigo: str, nombre_construccion: str) -> json
    #Entradas: Recibe dos parámetros: codigo de tipo str, que representa el código de la construcción a actualizar, y nombre_construccion de tipo str, que representa el nuevo nombre de la construcción.
    #Salida: Devuelve True si la construcción se actualizó correctamente en la base de datos, o False en caso de error.
    @staticmethod
    def modificar_usuario():
        try:
            usuario = request.get_json()  # Obtener los datos enviados desde el frontend
            resultado = Usuario.actualizar_usuario(usuario)  # Actualizar los datos en la base de datos

            return jsonify(resultado)
        except Exception as ex:
            print(f"Error en modificar_usuario: {str(ex)}")

    @staticmethod
    def actualizar_usuario(usuario):
        try:
            if 'id' not in usuario:
                raise Exception("'id' no está presente en los datos del usuario")

            conn = mysql.connect()  # Establecer la conexión a la base de datos
            cursor = conn.cursor()

            # En estas líneas de código, se verifica que el correo que se desea actualizar no lo tenga algún otro usuario,
            # excepto si la variable resultado coincide con el correo del mismo usuario
            sql = "SELECT correo FROM usuario WHERE correo = %s"
            cursor.execute(sql, (usuario['correo'],))
            resultado = cursor.fetchone()

            # Verificar si el resultado coincide con el correo del mismo usuario
            if resultado and resultado[0] != usuario['correo']:
                raise Exception("El correo electrónico ya está registrado")

            # Actualizar los datos del usuario en la base de datos
            # Insertar los datos del usuario en la base de datos, se guarda ruta_relativa para guardar la ubicación de la imagen relativa al proyecto
            sql = "UPDATE usuario SET nombre = %s, apellido = %s, telefono = %s, correo = %s, password = %s, urlAvatar = %s, sexo = %s, estado = %s WHERE id = %s"
            valores = (usuario['nombre'], usuario['apellido'], usuario['telefono'], usuario['correo'], usuario['password'], usuario['urlAvatar'], usuario['sexo'], usuario['estado'], usuario['id'])
            cursor.execute(sql, valores)

            conn.commit()  # Confirmar los cambios en la base de datos
            conn.close()  # Cerrar la conexión a la base de datos

            return {'mensaje': 'El usuario se actualizó correctamente'}
        except Exception as ex:
            print(f"Error en actualizar_usuario: {str(ex)}")
            return {'mensaje': str(ex)}
    @staticmethod
    def eliminarUsuario(id):
        try:
            conn = mysql.connect()  
            cursor = conn.cursor()
            sql = "UPDATE Proyecto_Integrado_I.usuario SET estado=0 WHERE id= %s"
            cursor.execute(sql, (id,))
            conn.commit()  # Confirmar los cambios en la base de datos
            conn.close()  # Cerrar la conexión a la base de datos
            return {'mensaje': 'El usuario se elimino correctamente'}
        except Exception as ex:
            print(f"Error en actualizar_usuario: {str(ex)}")
            return {'mensaje': str(ex)}