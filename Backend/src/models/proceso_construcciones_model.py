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

class ProcesoConstrucciones:
    
    @staticmethod
    def listarProcesoConstrucciones():
        try:
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Con E")
            sql = "SELECT * FROM proceso_construcciones"
            cursor.execute(sql)
            datos = cursor.fetchall()
            proceso_construcciones = []
            for fila in datos:
                mito_historia = {'cod': fila[0], 
                        'herramienta': fila[1], 
                        'descripcion': fila[2], 
                        'etapa': fila[3],
                        'imagen':fila[5]}
                proceso_construcciones.append(mito_historia)        
            conn.close()  
            return proceso_construcciones
        except Exception as ex:
            return {'mensaje': str(ex)}
        
    @staticmethod
    def getProcesoConstruccionesById(id):
        try:
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM proceso_construcciones WHERE id_proceso_construcciones = %s"
            cursor.execute(sql, (id,))
            fila = cursor.fetchone()
            if fila is not None:
                dios = {'cod': fila[0], 
                        'herramienta': fila[1], 
                        'descripcion': fila[2], 
                        'etapa': fila[3],
                        'tecnicas':fila[4],
                        'imagen':fila[5],
                        'estudiosArqueologicos':fila[6]}
                conn.close()  
                return dios
            else:
                return "No se encontró la herramienta"
        except Exception as ex:
            return {'mensaje': str(ex)}
        
            
    @staticmethod   
    def getProcesoConstruccionesImgById(id):
        try:
            imagenes=[]
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT imagen_url FROM imagenes WHERE oidTabla=5 and oidRecurso  = %s"
            cursor.execute(sql, (id,))
            fila = cursor.fetchone()
            if fila is not None:
                while fila is not None:
                    
                        imagenes.append(fila[0])
                        fila = cursor.fetchone()
                return imagenes
            else:
                return "No se encontró la herramienta"
        except Exception as ex:
            return {'mensaje': str(ex)}

    @staticmethod
    def filtrarProcesoConstrucciones(nombre):
        try:
            conn = mysql.connect()
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM proceso_construcciones WHERE herramienta LIKE %s OR descripcion LIKE %s OR etapa LIKE %s OR tecnicas LIKE %s;"
            params = ('' + nombre + '%', '' + nombre + '%', '' + nombre + '%', '' + nombre + '%')
            cursor.execute(sql, params)
            datos = cursor.fetchall()
            mitos_historias = []
            for fila in datos:
                mito_historia = {
                    'cod': fila[0],
                    'herramienta': fila[1],
                    'descripcion': fila[2], 
                    'etapa': fila[3],
                    'imagen':fila[4],
                    'estudiosArqueologicos':fila[5]
                }
                mitos_historias.append(mito_historia)
            conn.close()
            return mitos_historias
        except Exception as ex:
            return None

