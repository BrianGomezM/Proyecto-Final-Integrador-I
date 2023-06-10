# -*- coding: utf-8 -*-
from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS
from flask import Flask
import json
#FIRMA DE LA CLASE ARQUITECTURA_MODEL.PY
#A través de la clase Arquitectura y sus métodos estáticos, se busca facilitar la ejecución de consultas,
#inserciones, eliminaciones y actualizaciones de registros en la tabla "arquitectura". 
#Estos métodos encapsulan la lógica necesaria para realizar operaciones comunes relacionadas con 
#las construcciones, como listarlas, buscar una construcción por código, registrar nuevas construcciones, 
#eliminar construcciones existentes y actualizar información de construcciones. 

# Configuración de la conexión a la base de datos MySQL
app = Flask(__name__)
CORS(app) 
app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB
# Configuración de la conexión a la base de datos MySQL


# Configuración de la conexión a la base de datos MySQL
mysql = MySQL(app)
class Test:
    @staticmethod
    def listar_preguntas():
        try:
            conn = mysql.connect()   # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT ID_Pregunta, Pregunta, tp.nombreTipo, (SELECT respuesta FROM respuestas WHERE estado = 1 AND oidPregunta = ID_Pregunta) as rep FROM (SELECT p1.ID_Pregunta, p1.Pregunta, p1.tipoDato, (SELECT COUNT(*) FROM Preguntas p2  WHERE p2.tipoDato = p1.tipoDato AND p2.ID_Pregunta <= p1.ID_Pregunta) AS row_num  FROM Preguntas p1 WHERE tipoDato IN (1)) AS subquery INNER JOIN tipoDato tp ON subquery.tipoDato = tp.oid WHERE row_num <= 7 ORDER BY tipoDato;"
            cursor.execute(sql)
            datos = cursor.fetchall()
            preguntasLis = []
            for fila in datos:
                codPregunta = fila[0]
                pregunta = fila[1]
                tipopregunta = fila[2]
                verdadera = fila[3]
                # Ejecuta la segunda consulta para obtener los valores relacionados a cada pregunta
                sql_respuestas = "SELECT respuesta, estado FROM respuestas WHERE oidPregunta = %s"
                cursor.execute(sql_respuestas, (codPregunta,))
                datos1 = cursor.fetchall()
                respuestas = []
                for respuesta in datos1:
                    respuestas.append(respuesta[0])          
                resultado = {'codPregunta': codPregunta, 'pregunta': pregunta, 'tipoPregunta':tipopregunta ,'respuestaC':verdadera, 'respuestas': respuestas}
                preguntasLis.append(resultado)        
            conn.close()            
            return preguntasLis
        except Exception as ex:
            return None

    @staticmethod
    def insertarPodio(usuario, calificacion, horaI, horaF):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            # Verifica si el participante ya existe en la tabla podio
            sql0 = "SELECT DISTINCT u.id FROM usuario u INNER JOIN token t on u.id = t.user_id WHERE t.valor = %s"
            cursor.execute(sql0, (usuario,))
            datos1 = cursor.fetchall()
            for respuesta in datos1:
                print("entro")
                coduser = respuesta[0]
                # Verifica si el participante ya existe en la tabla podio
                sql = "SELECT intentos FROM podio WHERE codParticipante = %s"
                cursor.execute(sql, (coduser,))
                datos = cursor.fetchone()
                
                if datos is not None:
                    # El participante ya existe, actualiza sus datos en la tabla podio
                    sql2 = "UPDATE podio SET horaInicio=%s, horaFinal=%s, calificacion=%s, intentos=(intentos+1) WHERE codParticipante = %s"
                    cursor.execute(sql2, (horaI, horaF, calificacion, coduser))
                    conn.commit()
                    conn.close()
                    
                    # Construye el mensaje de éxito
                    respuesta = "Datos actualizados correctamente en la tabla podio."
                    return respuesta
                else:
                    # El participante no existe, inserta sus datos en la tabla podio
                    sql3 = "INSERT INTO podio(codParticipante, horaInicio, horaFinal, calificacion, intentos) VALUES (%s, %s, %s, %s, 1)"
                    cursor.execute(sql3, (coduser, horaI, horaF, calificacion))
                    conn.commit()
                    conn.close()                
                    # Construye el mensaje de éxito
                    respuesta = "Datos insertados correctamente en la tabla podio."
                    return respuesta
        except Exception as ex:
            return None


    @staticmethod
    def listar_podio():
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            
            sql = "SELECT concat(u.nombre, ' ', u.apellido) as usuario, p.calificacion, TIMESTAMPDIFF(MINUTE, p.horaInicio, p.horaFinal) AS duracion_minutos, p.fechaRegistro, p.intentos FROM podio p INNER JOIN usuario u ON p.codParticipante = u.id"
            cursor.execute(sql)
            resultados = cursor.fetchall()            
            lista_participantes = []            
            for fila in resultados:
                participante = {
                    "usuario": fila[0],
                    "calificacion": fila[1],
                    "duracion_minutos": fila[2],
                    "fechaRegistro": fila[3],
                    "intentos": fila[4]
                }                
                lista_participantes.append(participante)            
            conn.close()
            return lista_participantes
        except Exception as ex:
            return None


    