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
    
@app.route('/dioses', methods=['GET'])
def listarDioses():
    try:
        conn = mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()
        print("Conexión exitosa")
        
        # Aquí puedes ejecutar tus consultas SQL
        # Por ejemplo:
        sql = "SELECT * FROM dioses"
        cursor.execute(sql)
        datos = cursor.fetchall()
        cursos = []
        for fila in datos:
            curso = {'cod': fila[0], 
                     'nombre': fila[1], 
                     'representacion': fila[2], 
                     'historia': fila[3],
                     'imagen':fila[4]}
            cursos.append(curso)        
        conn.close()  # Cierra la conexión a la base de datos
        return jsonify({'dioses': cursos, 'mensaje': "Lista de dioses egipcios"})
    except Exception as ex:
        return jsonify({"mensaje":"Error"})
    
@app.route('/diosesById/<id>', methods=['GET'])
def getGodById(id):
    try:
        conn = mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()
        print("Conexión exitosa")
        sql = "SELECT * FROM dioses WHERE id_dios = %s"
        cursor.execute(sql, (id,))
        fila = cursor.fetchone()
        if fila is not None:
            curso = {'cod': fila[0], 
                     'nombre': fila[1], 
                     'representacion': fila[2], 
                     'historia': fila[3],
                     'imagen':fila[4],
                     'roles':fila[5]}
            conn.close()  # Cierra la conexión a la base de datos
            return jsonify({'Dios': curso, 'mensaje': "Se encontró el Dios"})
        else:
            return jsonify({"mensaje": "No se encontró la construcción"})
    except Exception as ex:
        return jsonify({"mensaje": "Error"})
    

def pagina_no_encontrada(error):
    return "<h1>La página que intentas buscar no existe....</h1>"

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada), 444
    app.run()
    
#https://www.youtube.com/watch?v=D6LZnrDbQPM&ab_channel=UskoKruM2010