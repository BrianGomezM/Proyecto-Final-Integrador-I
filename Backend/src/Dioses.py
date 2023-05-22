from flask import Flask, jsonify, request
from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS

@app.route('/arquitectura2', methods=['GET'])
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