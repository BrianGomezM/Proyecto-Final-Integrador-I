from flask import jsonify, request
from app import mysql
from models.construccion_model import Construccion

from . import bp

@bp.route('/', methods=['GET'])
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
        construcciones = []
        for fila in datos:
            construccion = Construccion(fila[0], fila[1], fila[2], fila[3], fila[4], fila[5], fila[6])
            construcciones.append(construccion.to_dict())        
        conn.close()  # Cierra la conexión a la base de datos
        return jsonify({'construcciones': construcciones, 'mensaje': "Lista de construcciones egipcias"})
    except Exception as ex:
        return jsonify({"mensaje":"Error"})
