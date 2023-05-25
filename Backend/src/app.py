from flask import Flask, jsonify, request
from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 
# Configuración de la conexión a la base de datos MySQL
app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB

mysql = MySQL(app)

# Resto de tu código...

@app.route('/arquitectura', methods=['GET'])
def listarAquitectura():
    try:
        conn = mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()
        print("Conexión exitosa")
        
        # Aquí puedes ejecutar tus consultas SQL
        # Por ejemplo:
        sql = "SELECT * FROM arquitectura"
        cursor.execute(sql)
        datos = cursor.fetchall()
        cursos = []
        for fila in datos:
            curso = {'cod': fila[0], 'nombre': fila[1], 'resumen': fila[2], 'historia': fila[3], 'ubicacion': fila[4], 'lugar': fila[5], 'fecha': fila[6]}
            cursos.append(curso)        
        conn.close()  # Cierra la conexión a la base de datos
        return jsonify({'construcciones': cursos, 'mensaje': "Lista de construcciones egipcias"})
    except Exception as ex:
        return jsonify({"mensaje":"Error"})

@app.route('/arquitectura/<codigo>', methods=['GET'])
def buscarConstruccion(codigo):
    try:
        conn = mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()
        print("Conexión exitosa")
        
        # Aquí puedes ejecutar tus consultas SQL
        # Por ejemplo:
        sql = "SELECT * FROM arquitectura WHERE oid = %s"
        cursor.execute(sql, (codigo,))
        datos = cursor.fetchone()
        if datos is not None:
            curso = {'cod': fila[0], 'nombre': fila[1], 'resumen': fila[2], 'historia': fila[3], 'ubicacion': fila[4], 'lugar': fila[5], 'fecha': fila[6]}
            conn.close()  # Cierra la conexión a la base de datos
            return jsonify({'construccion': curso, 'mensaje': "Se encontró la construcción"})
        else:
            return jsonify({"mensaje": "No se encontró la construcción"})
    except Exception as ex:
        return jsonify({"mensaje": "Error"})

@app.route('/arquitectura', methods=['POST'])
def registrarConstruccion():
    
    try:
        nombre_construccion = request.json.get('nombreConstruccion')
        print(nombre_construccion)
        conn = mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()
        print("Conexión exitosa")

        # Aquí puedes ejecutar tus consultas SQL
        # Por ejemplo:
        sql = "INSERT INTO arquitectura (nombre_construccion) VALUES (%s)"
        cursor.execute(sql, (nombre_construccion,))
        conn.commit()  # Realiza el commit después de ejecutar la consulta
        conn.close()  # Cierra la conexión a la base de datos
        return jsonify({"mensaje": "Se registró correctamente"})
    except Exception as ex:
        return jsonify({"mensaje": "Error"})
    
@app.route('/arquitectura/<codigo>', methods=['DELETE'])
def eliminarConstruccion(codigo):
    try:
        conn = mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()
        print("Conexión exitosa")
        # Aquí puedes ejecutar tus consultas SQL
        # Por ejemplo:
        sql = "DELETE FROM arquitectura WHERE codigo = %s"
        cursor.execute(sql, (codigo,))
        conn.commit()  # Realiza el commit después de ejecutar la consulta
        conn.close()  # Cierra la conexión a la base de datos
        return jsonify({"mensaje": "Construcción eliminada correctamente"})
    except Exception as ex:
        return jsonify({"mensaje": "Error al eliminar la construcción"})

@app.route('/arquitectura/<codigo>', methods=['PUT'])
def actualizarConstruccion(codigo):
    try:
        nombre_construccion = request.json.get('nombreConstruccion')
        conn = mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()
        print("Conexión exitosa")
        # Aquí puedes ejecutar tus consultas SQL
        # Por ejemplo:
        sql = "UPDATE arquitectura SET nombre_construccion = %s WHERE codigo = %s"
        cursor.execute(sql, (nombre_construccion, codigo))
        conn.commit()  # Realiza el commit después de ejecutar la consulta
        conn.close()  # Cierra la conexión a la base de datos
        return jsonify({"mensaje": "Construcción actualizada correctamente"})
    except Exception as ex:
        return jsonify({"mensaje": "Error al actualizar la construcción"})
@app.route('/registrar_usuario', methods=['POST'])
def registrar_usuario():
    usuario = request.get_json()  # Obtener los datos enviados desde el frontend
    resultado = guardar_usuario(usuario)  # Guardar los datos en la base de datos

    return jsonify(resultado)

def guardar_usuario(usuario):
    try:
        conn = mysql.connect()  # Establecer la conexión a la base de datos
        cursor = conn.cursor()

        # Insertar los datos del usuario en la base de datos
        sql = "INSERT INTO usuario (nombre, apellido, telefono, correo, password, urlAvatar) VALUES (%s, %s, %s, %s, %s, %s)"
        valores = (usuario['nombre'], usuario['apellido'], usuario['telefono'], usuario['correo'], usuario['password'], usuario['urlAvatar'])
        cursor.execute(sql, valores)

        conn.commit()  # Confirmar los cambios en la base de datos
        conn.close()  # Cerrar la conexión a la base de datos

        return {'mensaje': 'El usuario se registró correctamente'}
    except Exception as ex:
        return {'mensaje': str(ex)}
@app.route('/login', methods=['POST'])  
def login(): 
    try:
        param = request.args.get('param')

        if param:
            # Realizar la consulta con el parámetro de búsqueda
            usuarios = consultarUsuariosLike(param)
        else:
            # No se proporcionó un parámetro de búsqueda
            # Devolver una respuesta de error o manejarlo según tus necesidades
            return jsonify({'mensaje': 'No se proporcionó un parámetro de búsqueda'})

        # Devolver la respuesta en formato JSON
        return jsonify(usuarios)

    except Exception as ex:
        # Error en el procesamiento de la solicitud
        return jsonify({'mensaje': 'Error al obtener los usuarios'})

def pagina_no_encontrada(error):
    return "<h1>La página que intentas buscar no existe....</h1>"

def consultarUsuariosLike(param):
    sql = "SELECT * FROM usuario WHERE nombre LIKE '%{}%'".format(param)
       # Aquí debes adaptar tu lógica de consulta a la base de datos y ejecutar la consulta
    # El siguiente código es solo un ejemplo y debes reemplazarlo con tu propia lógica
    # para ejecutar la consulta y obtener los resultados
    resultado = ejecutar_consulta(sql)
    usuarios = []

    for fila in resultado:
        # Aquí debes adaptar la forma en que se almacenan los resultados en la lista de usuarios
        # según la estructura de los objetos Usuario en tu aplicación
        usuario = {
            'nombre': fila['nombre'],
            'apellido': fila['apellido'],
            'telefono': fila['telefono'],
            'correo': fila['correo'],
            'password': fila['password'],
            'url_avatar': fila['url_avatar']
        }
        usuarios.append(usuario)

    return usuarios

def ejecutar_consulta(sql):
    # Aquí debes implementar tu lógica de conexión a la base de datos y ejecución de la consulta
    # Retorna el resultado de la consulta en el formato adecuado
    resultado = [...]
    return resultado

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada), 444
    app.run()
    
#https://www.youtube.com/watch?v=D6LZnrDbQPM&ab_channel=UskoKruM2010  33:48