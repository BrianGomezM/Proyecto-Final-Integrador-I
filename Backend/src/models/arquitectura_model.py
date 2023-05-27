from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS
from flask import Flask

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
class Arquitectura:
    @staticmethod
    #Este método establece una conexión a la base de datos MySQL y ejecuta una consulta para obtener todas las construcciones de la tabla 
    #arquitectura". Luego, los datos obtenidos se almacenan en una lista de diccionarios, 
    #donde cada diccionario representa una construcción. Finalmente, se cierra la conexión a la base de datos y se devuelve la lista de construcciones.
    #En caso de error, se devuelve
    # Firma: @staticmethod def listar_construcciones() -> json
    #Entradas: No recibe ningún parámetro.
    #Salida: Devuelve una lista de diccionarios, donde cada diccionario representa una construcción de arquitectura. 
    # En caso de error o si no se encontraron construcciones, retorna None.  
    def listar_construcciones():
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM arquitectura"
            cursor.execute(sql)
            datos = cursor.fetchall()
            construcciones = []
            for fila in datos:
                construccion = {'cod': fila[0], 'nombre': fila[1], 'resumen': fila[2], 'historia': fila[3], 'ubicacion': fila[4], 'lugar': fila[5], 'fecha': fila[6]}
                construcciones.append(construccion)
            conn.close()
            return construcciones
        except Exception as ex:
            return None

    @staticmethod
    #Este método recibe como parámetro el código de una construcción y realiza una consulta en la base de datos para buscar la construcción correspondiente. 
    # Si se encuentra la construcción, se crea un diccionario con los detalles de la misma y se devuelve. En caso de no encontrar la construcción, 
    # se devuelve None.
    #Firma: @staticmethod def buscar_construccion(codigo: str) -> json
    #Entradas: Recibe un parámetro codigo de tipo str, que representa el código de la construcción a buscar.
    #Salida: Devuelve un diccionario que representa la construcción encontrada según el código proporcionado. 
    # En caso de no encontrar la construcción, retorna None.
    def buscar_construccion(codigo):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM arquitectura WHERE oid = %s"
            cursor.execute(sql, (codigo,))
            datos = cursor.fetchone()
            if datos is not None:
                construccion = {'cod': datos[0], 'nombre': datos[1], 'resumen': datos[2], 'historia': datos[3], 'ubicacion': datos[4], 'lugar': datos[5], 'fecha': datos[6]}
                conn.close()
                return construccion
            else:
                return None
        except Exception as ex:
            return None

    @staticmethod
    #Este método recibe como parámetro el nombre de una construcción y realiza una inserción en la base de datos para registrarla. 
    # Si la inserción se realiza correctamente, se devuelve True. En caso de error, se devuelve False.
    #Firma: @staticmethod def registrar_construccion(nombre_construccion: str) -> json
    #Entradas: Recibe un parámetro nombre_construccion de tipo str, que representa el nombre de la construcción a registrar.
    #Salida: Devuelve True si la construcción se registró correctamente en la base de datos, o False en caso de error.
    def registrar_construccion(nombre_construccion):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "INSERT INTO arquitectura (nombre_construccion) VALUES (%s)"
            cursor.execute(sql, (nombre_construccion,))
            conn.commit()
            conn.close()
            return True
        except Exception as ex:
            return False

    @staticmethod
    # Este método recibe como parámetro el código de una construcción y realiza una eliminación en la base de datos para eliminarla.
    # Si la eliminación se realiza correctamente, se devuelve True. En caso de error, se devuelve False.
    #Firma: @staticmethod def eliminar_construccion(codigo: str) -> json
    #Entradas: Recibe un parámetro codigo de tipo str, que representa el código de la construcción a eliminar.
    #Salida: Devuelve True si la construcción se eliminó correctamente de la base de datos, o False en caso de error.
    def eliminar_construccion(codigo):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "DELETE FROM arquitectura WHERE codigo = %s"
            cursor.execute(sql, (codigo,))
            conn.commit()
            conn.close()
            return True
        except Exception as ex:
            return False

    @staticmethod
    # Este método recibe como parámetros el código de una construcción y el nuevo nombre que se desea asignar. 
    # Realiza una actualización en la base de datos para modificar el nombre de la construcción.
    #  Si la actualización se realiza correctamente, se devuelve True. En caso de error, se devuelve False.
    #Firma: @staticmethod def actualizar_construccion(codigo: str, nombre_construccion: str) -> json
    #Entradas: Recibe dos parámetros: codigo de tipo str, que representa el código de la construcción a actualizar, y nombre_construccion de tipo str, que representa el nuevo nombre de la construcción.
    #Salida: Devuelve True si la construcción se actualizó correctamente en la base de datos, o False en caso de error.
    def actualizar_construccion(codigo, nombre_construccion):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "UPDATE arquitectura SET nombre_construccion = %s WHERE codigo = %s"
            cursor.execute(sql, (nombre_construccion, codigo))
            conn.commit()
            conn.close()
            return True
        except Exception as ex:
            return False
        
    @staticmethod
    #Este método establece una conexión a la base de datos MySQL y ejecuta una consulta para obtener todas las imagenes de construcciones de la tabla 
    #Imagenes". Luego, los datos obtenidos se almacenan en una lista de diccionarios, 
    #donde cada diccionario representa una construcción. Finalmente, se cierra la conexión a la base de datos y se devuelve la lista de construcciones.
    #En caso de error, se devuelve
    # Firma: @staticmethod def listar_construcciones() -> json
    #Entradas: No recibe ningún parámetro.
    #Salida: Devuelve una lista de diccionarios, donde cada diccionario representa una construcción de arquitectura. 
    # En caso de error o si no se encontraron construcciones, retorna None.  
    def listar_construccionesIMG(codigo):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT * FROM imagenes WHERE oidRecurso = %s AND oidTabla = 1"
            cursor.execute(sql, (codigo,))
            datos = cursor.fetchall()
            construcciones = []
            for fila in datos:
                construccion = {'cod': fila[0], 'imagen_url': fila[1], 'oidRecurso': fila[2], 'oidTabla': fila[3]}
                construcciones.append(construccion)
            conn.close()
            return construcciones
        except Exception as ex:
            return None