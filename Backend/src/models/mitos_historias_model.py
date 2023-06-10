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

class MitosHistorias:

    @staticmethod
    def listarMitosHistorias():
        try:
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Con E")
            sql = "SELECT * FROM mitos_historias"
            cursor.execute(sql)
            datos = cursor.fetchall()
            mitos_historias = []
            for fila in datos:
                mito_historia = {'cod': fila[0], 
                        'titulo': fila[1], 
                        'descripcion': fila[2], 
                        'contenido': fila[3],
                        'imagen':fila[4]}
                mitos_historias.append(mito_historia)        
            conn.close()  
            return mitos_historias
        except Exception as ex:
            return None
        
    @staticmethod
    def getMitosHistoriasById(id):
        try:
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM mitos_historias WHERE id_mitos_historias = %s"
            cursor.execute(sql, (id,))
            fila = cursor.fetchone()
            if fila is not None:
                dios = {'cod': fila[0], 
                        'titulo': fila[1], 
                        'descripcion': fila[2], 
                        'contenido': fila[3],
                        'imagen':fila[4],
                        'categoria':fila[5],
                        'dioses_relacionados':fila[6]}
                conn.close()  
                return dios
            else:
                return "No se encontró el mito-historia"
        except Exception as ex:
            return None
        
    @staticmethod   
    def getMitosHistoriasImgById(id):
        try:
            imagenes=[]
            conn = mysql.connect() 
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT imagen_url FROM imagenes WHERE oidTabla=4 and oidRecurso  = %s"
            cursor.execute(sql, (id,))
            fila = cursor.fetchone()
            if fila is not None:
                while fila is not None:
                    
                        imagenes.append(fila[0])
                        fila = cursor.fetchone()
                return imagenes
            else:
                return "No se encontró el mito-historia"
        except Exception as ex:
            return None
