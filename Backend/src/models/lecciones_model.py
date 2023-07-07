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
class Lecciones:

    @staticmethod
    def getLecciones(correoUsuario,idTabla):
            try:
                print("1")
                lecciones=[]
                conn = mysql.connect() 
                cursor = conn.cursor()
                print("Conexión exitosa")
                sql = """
                    SELECT el.id_leccion, el.estado FROM usuario u
                    INNER JOIN estado_lecciones el ON el.correoUsuario = u.correo
                    INNER JOIN tabla t             ON el.id_tabla = t.oid
                    WHERE u.correo = %s and t.oid =%s;
                """
                cursor.execute(sql, (correoUsuario,idTabla))
                datos = cursor.fetchall()
                for fila in datos:
                    leccion = {'idLeccion': fila[0], 
                            'estado': fila[1]}
                    lecciones.append(leccion)
                conn.close()  
                return lecciones
            except Exception as ex:
                return None
    @staticmethod
    def registrar_leccion(leccion):
        try:
            conn = mysql.connect()  # Establecer la conexión a la base de datos
            cursor = conn.cursor()
            sql = """INSERT INTO Proyecto_Integrado_I.estado_lecciones
            (id_tabla, id_leccion, estado, correoUsuario)
            VALUES(%s, %s, 1 , %s)"""
            valores = (leccion['id_tabla'], leccion['id_leccion'], leccion['correo'])
            cursor.execute(sql, (valores))

            conn.commit()  # Confirmar los cambios en la base de datos
            conn.close()  # Cerrar la conexión a la base de datos

            return {'mensaje': 'La leccion se registró correctamente'}
        except Exception as ex:
            print(f"Error en guardar_usuario: {str(ex)}")
            return {'mensaje': str(ex)}
    @staticmethod
    def listarPinturasL(correo):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT id_leccion, estado FROM estado_lecciones WHERE correoUsuario = %s AND id_tabla = 8"
            cursor.execute(sql, (correo,))
            datos = cursor.fetchall()
            construcciones = []
            for fila in datos:
                construccion = {'id_leccion': fila[0], 'estado': fila[1]}
                construcciones.append(construccion)
            conn.close()
            return construcciones
        except Exception as ex:
            return None
        
        