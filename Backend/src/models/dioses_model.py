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
class Dioses:

    @staticmethod
    def listarDioses():
        try:
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Con E")
            sql = "SELECT * FROM dioses"
            cursor.execute(sql)
            datos = cursor.fetchall()
            dioses = []
            for fila in datos:
                dios = {'cod': fila[0], 
                        'nombre': fila[1], 
                        'representacion': fila[2], 
                        'historia': fila[3],
                        'imagen':fila[4]}
                dioses.append(dios)        
            conn.close()  
            return dioses
        except Exception as ex:
            return None
        
    @staticmethod
    def getGodById(id):
        try:
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM dioses WHERE id_dios = %s"
            cursor.execute(sql, (id,))
            fila = cursor.fetchone()
            if fila is not None:
                dios = {'cod': fila[0], 
                        'nombre': fila[1], 
                        'representacion': fila[2], 
                        'historia': fila[3],
                        'imagen':fila[4],
                        'roles':fila[5]}
                conn.close()  
                return dios
            else:
                return "No se encontró la construcción"
        except Exception as ex:
            return None
        
    @staticmethod   
    def getDiosesImgById(id):
        try:
            imagenes=[]
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT imagen_url FROM imagenes WHERE oidTabla=2 and oidRecurso  = %s"
            cursor.execute(sql, (id,))
            fila = cursor.fetchone()
            if fila is not None:
                while fila is not None:
                    
                        imagenes.append(fila[0])
                        fila = cursor.fetchone()
                return imagenes
            else:
                return "No se encontró la construcción"
        except Exception as ex:
            return None
        
    @staticmethod
    def filtrarDioses(nombre):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM dioses WHERE nombre_dios LIKE %s OR representacion LIKE %s OR historia LIKE %s OR rol LIKE %s;"
            params = ('' + nombre + '%', '' + nombre + '%', '' + nombre + '%', '' + nombre + '%')
            cursor.execute(sql, params)
            datos = cursor.fetchall()
            dioses = []
            for fila in datos:
                dios = {
                    'cod': fila[0],
                    'nombre': fila[1],
                    'representacion': fila[2],
                    'historia': fila[3],
                    'imagen': fila[4]
                }
                dioses.append(dios)
            conn.close()
            return dioses
        except Exception as ex:
            return None
