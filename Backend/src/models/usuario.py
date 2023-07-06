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
ruta_proyecto = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))  # Ruta del directorio del proyecto
ruta_imagenes = os.path.join(ruta_proyecto, "static", "imagenes")





class Usuario:
    @staticmethod
    def crear_carpetas(ruta):
        partes = ruta.split("/")
        ruta_carpeta = ""
        for parte in partes:
            if parte == "":
                continue
            ruta_carpeta += "/" + parte
            if not os.path.isdir(ruta_carpeta):
                os.mkdir(ruta_carpeta)

    @staticmethod
    def obtener_datos_imagen(imagen, ruta):
        encabezado, contenido = imagen.split(",", 1)
        extension = encabezado.split(";")
        extension = extension[0].split("/")
        nombre_archivo = str(uuid.uuid4()) + "." + extension[-1]
        ruta_archivo = os.path.join(ruta, nombre_archivo)
        return [ruta_archivo, contenido]

    @staticmethod
    def guardar_imagen(imagen, contenido):
        ruta_archivo = os.path.join(app.static_folder, imagen)
        with open(ruta_archivo, "wb") as archivo:
            archivo.write(base64.b64decode(contenido))
        
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
                usuario = {'id': fila[0], 'nombre': fila[1], 'apellido': fila[2], 'telefono': fila[3], 'correo': fila[4], 'password': fila[5], 'urlAvatar': url_for('static', filename=fila[6], _external=True), 'sexo': fila[7] , 'estado': fila[8]}
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
            
            if 'urlAvatar' in usuario and usuario['urlAvatar']:
                ruta_imagen = ruta_imagenes  # Ruta de almacenamiento de las imágenes
                os.makedirs(ruta_imagen, exist_ok=True)  # Crea la estructura de carpetas si no existe
                datos_imagen = Usuario.obtener_datos_imagen(usuario['urlAvatar'], ruta_imagen)
                Usuario.guardar_imagen(datos_imagen[0], datos_imagen[1])
            
            #ruta_relativa = os.path.relpath(datos_imagen[0], ruta_proyecto)
            
            sql = "SELECT correo FROM usuario WHERE correo = %s"
            cursor.execute(sql, (usuario['correo'],))
            resultado = cursor.fetchone()
            if resultado:
                raise Exception("El correo electrónico ya está registrado")

            # Insertar los datos del usuario en la base de datos, se guarda ruta_relativa para guardar la ubicación de la imagen relativa al proyecto
            if 'urlAvatar' in usuario and usuario['urlAvatar']:
                ruta_relativa = os.path.relpath(datos_imagen[0], ruta_proyecto).replace('\\', '//').replace('static/', '')
            else: ruta_relativa = ''
            sql = "INSERT INTO usuario (nombre, apellido, telefono, correo, password, urlAvatar, sexo, estado) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            valores = (usuario['nombre'], usuario['apellido'], usuario['telefono'], usuario['correo'], usuario['password'], ruta_relativa, usuario['sexo'], usuario['estado'])
            cursor.execute(sql, (valores))

            conn.commit()  # Confirmar los cambios en la base de datos
            conn.close()  # Cerrar la conexión a la base de datos

            return {'mensaje': 'El usuario se registró correctamente'}
        except Exception as ex:
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
        usuario = request.get_json()  # Obtener los datos enviados desde el frontend
        resultado = Usuario.actualizar_usuario(usuario)  # Actualizar los datos en la base de datos

        return jsonify(resultado)

    @staticmethod
    def actualizar_usuario(usuario):
        try:
            if 'id' not in usuario:
                raise Exception("'id' no está presente en los datos del usuario")

            conn = mysql.connect()  # Establecer la conexión a la base de datos
            cursor = conn.cursor()
            
            comparador = os.path.relpath(usuario['urlAvatar'], '').replace('\\', '//').replace('https://egiptianapionrender.com/static', '')
            
            if comparador != 'https://egiptianapionrender.com/static':
                sql = "SELECT urlAvatar FROM usuario WHERE id = %s"
                cursor.execute(sql, (usuario['id'],))
                resultado = cursor.fetchone()
                print(comparador)
                # Verificar si el resultado coincide con el urlAvatar del mismo usuario
                if resultado and resultado[0] != comparador:
                    ruta_imagen = ruta_imagenes  # Ruta de almacenamiento de las imágenes
                    os.makedirs(ruta_imagen, exist_ok=True)  # Crea la estructura de carpetas si no existe
                    datos_imagen = Usuario.obtener_datos_imagen(usuario['urlAvatar'], ruta_imagen)
                    Usuario.guardar_imagen(datos_imagen[0], datos_imagen[1])
                    ruta_relativa = os.path.relpath(datos_imagen[0], ruta_proyecto).replace('\\', '//').replace('static/', '')
                if resultado and resultado[0] == comparador:
                    ruta_relativa = resultado[0]
            else: ruta_relativa = ''
                
            #En estas líneas de código, se verifica que el correo que se desea actualizar no lo tenga algún otro usuario, 
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
            valores = (usuario['nombre'], usuario['apellido'], usuario['telefono'], usuario['correo'], usuario['password'], ruta_relativa, usuario['sexo'], usuario['estado'], usuario['id'])
            cursor.execute(sql, valores)

            conn.commit()  # Confirmar los cambios en la base de datos
            conn.close()  # Cerrar la conexión a la base de datos

            return {'mensaje': 'El usuario se actualizó correctamente'}
        except Exception as ex:
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