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
            sql = "SELECT subquery.oid,   subquery.pregunta,  tp.nombreTipo,  (SELECT   r.respuesta  FROM  respuestas r  WHERE   r.estado = 1 AND r.oidPregunta = subquery.oid) AS rep FROM (SELECT p1.oid, p1.pregunta, p1.tipoDato,(SELECT COUNT(*) FROM preguntas p2 WHERE p2.tipoDato = p1.tipoDato AND p2.oid <= p1.oid) AS row_num FROM preguntas p1 WHERE p1.tipoDato IN(1)) AS subquery INNER JOIN tipoDato tp ON subquery.tipoDato = tp.oid WHERE subquery.row_num <= 7 ORDER BY subquery.tipoDato;"
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
            sql = "SELECT usuario, urlAvatar, calificacion, duracion_segundos, fechaRegistro, intentos FROM vista_podio"
            cursor.execute(sql)
            resultados = cursor.fetchall()            
            lista_podio = [] 
            consecutivo = 0           
            for fila in resultados:
                consecutivo += 1
                if consecutivo == 1:
                    icono = 'fa fa-trophy'
                else:
                    icono = 'fa fa-star'
                
                participante = {
                    "consecutivo": consecutivo,
                    "usuario": fila[0],
                    "urlAvatar": fila[1],
                    "calificacion": fila[2],
                    "duracion_segundos": fila[3],
                    "fechaRegistro": fila[4],
                    "intentos": fila[5],
                    "icono": icono,
                }                
                lista_podio.append(participante)            
            conn.close()
            return lista_podio
        except Exception as ex:
            return None
    @staticmethod
    def consultar_userTest(codigo):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT DISTINCT concat(u.nombre,' ',u.apellido) as nombre, CONCAT(IF(LEFT(u.urlAvatar, 5) != 'https', 'http://127.0.0.1:5000/static/', ''), u.urlAvatar) AS urlAvatar FROM token t INNER JOIN usuario u ON t.user_id = u.id WHERE t.valor =  %s"
            cursor.execute(sql, (codigo,))
            datos = cursor.fetchone()
            if datos is not None:
                userTest = {'nombreA': datos[0], 'urlFoto': datos[1]}
                conn.close()
                return userTest
            else:
                return None
        except Exception as ex:
            return None

    