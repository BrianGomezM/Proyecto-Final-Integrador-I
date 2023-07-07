from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS
from flask import Flask


app = Flask(__name__)
CORS(app) 
app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB

mysql = MySQL(app)

class Practicas:

    @staticmethod
    def listarPracticas():
        try:
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Con E")
            sql = "SELECT * FROM practicas"
            cursor.execute(sql)
            datos = cursor.fetchall()
            practicas = []
            for fila in datos:
                practica = {'cod': fila[0], 
                        'nombre': fila[1], 
                        'descripcion': fila[2], 
                        'contenido': fila[3],
                        'imagen':fila[4]}
                practicas.append(practica)        
            conn.close()  
            return practicas
        except Exception as ex:
            return None
        
    @staticmethod
    def getPracticasById(id):
        try:
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM practicas WHERE id_practicas = %s"
            cursor.execute(sql, (id,))
            fila = cursor.fetchone()
            if fila is not None:
                dios = {'cod': fila[0], 
                        'nombre': fila[1], 
                        'descripcion': fila[2], 
                        'contenido': fila[3],
                        'imagen':fila[4],
                        'diosesRelacionados':fila[5]}
                conn.close()  
                return dios
            else:
                return "No se encontró la práctica religiosa"
        except Exception as ex:
            return None
        
    @staticmethod   
    def getPracticasImgById(id):
        try:
            imagenes=[]
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT imagen_url FROM imagenes WHERE oidTabla=6 and oidRecurso  = %s"
            cursor.execute(sql, (id,))
            fila = cursor.fetchone()
            if fila is not None:
                while fila is not None:
                    
                        imagenes.append(fila[0])
                        fila = cursor.fetchone()
                return imagenes
            else:
                return "No se encontró la práctica religiosa"
        except Exception as ex:
            return None
        
    @staticmethod
    def filtrarPracticas(nombre):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM practicas WHERE nombre LIKE %s OR descripcion LIKE %s OR contenido LIKE %s OR diosesRelaconados LIKE %s;"
            params = ('' + nombre + '%', '' + nombre + '%', '' + nombre + '%', '' + nombre + '%')
            cursor.execute(sql, params)
            datos = cursor.fetchall()
            practicas = []
            for fila in datos:
                practica = {
                    'cod': fila[0],
                    'nombre': fila[1],
                    'descripcion': fila[2], 
                    'contenido': fila[3],
                    'imagen':fila[4],
                    'diosesRelacionados':fila[5]
                }
                practicas.append(practica)
            conn.close()
            return practicas
        except Exception as ex:
            return None
