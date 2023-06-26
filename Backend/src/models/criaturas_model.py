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
class Criaturas:
###################################################################################################
# Método: listarCriaturas
# Descripción:
# Este método se utiliza para obtener una lista de todas las criaturas egipcias.
# Realiza una consulta a la base de datos para obtener los datos de todas las criaturas
# y retorna la criatura.
###################################################################################################
        @staticmethod
        def listarCriaturas():
            try:
                conn = mysql.connect() 
                cursor = conn.cursor()
                print("Con E")
                sql = "SELECT * FROM criaturas"
                cursor.execute(sql)
                datos = cursor.fetchall()
                criaturas = []
                for fila in datos:
                    criatura = {'cod': fila[0], 
                     'nombre': fila[1], 
                     'historia': fila[2], 
                     'representacion': fila[3],
                     'origen': fila[4],
                     'caracteristicas': fila[5],
                     'rol': fila[6],
                     'imagen':fila[7]
                     }
                    criaturas.append(criatura)        
                conn.close()  
                return criaturas
            except Exception as ex:
                return None
###################################################################################################
# Método: getCriaturaById
# Descripción:
# Este método se utiliza para obtener los datos de una criatura específica por su ID.
# Busca en la base de datos los campos asociados a la criatura y los devuelve como
# respuesta los detalles de la criatura
#
# Parámetros: <id> (int): El ID de la criatura que se desea obtener.
###################################################################################################            
        @staticmethod
        def getCriaturaById(id):
            try:
                conn = mysql.connect() 
                cursor = conn.cursor()
                print("Conexión exitosa")
                sql = "SELECT * FROM criaturas WHERE id_criatura = %s"
                cursor.execute(sql, (id,))
                fila = cursor.fetchone()
                if fila is not None:
                    criatura = {'cod': fila[0], 
                     'nombre': fila[1], 
                     'historia': fila[2], 
                     'representacion': fila[3],
                     'origen': fila[4],
                     'caracteristicas': fila[5],
                     'rol': fila[6],
                     'imagen':fila[7]
                     }
                    conn.close()  
                    return criatura
                else:
                    return "No se encontró la criatura"
            except Exception as ex:
                return None
###################################################################################################
# Método: getCriaturaImgById
# Descripción:
# Este método se utiliza para obtener las imágenes de una criatura específica por su ID. 
# Busca en la base de datos las imágenes asociadas a la criatura y las devuelve como 
# respuesta la lista de imagenes
# Parámetros de URL: <id> (int): El ID de la criatura para la cual se desean obtener las imágenes.
###################################################################################################          
        @staticmethod   
        def getCriaturaImgById(id):
            try:
                imagenes=[]
                conn = mysql.connect() 
                cursor = conn.cursor()
                print("Conexión exitosa")
                sql = "SELECT imagen_url FROM imagenes WHERE oidTabla=3 and oidRecurso  = %s"
                cursor.execute(sql, (id,))
                fila = cursor.fetchone()
                if fila is not None:
                    while fila is not None:
                        
                            imagenes.append(fila[0])
                            fila = cursor.fetchone()
                    return imagenes
                else:
                    return "No se encontró la criatura"
            except Exception as ex:
                return None