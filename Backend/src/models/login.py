from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS
from flask import Flask, jsonify, request
from datetime import datetime
import jwt

# Configuración de la conexión a la base de datos MySQL
app = Flask(__name__)
CORS(app)
app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB

# Configuración de la conexión a la base de datos MySQL
mysql = MySQL(app)


class Login:
    @staticmethod
    def consultarUsuarioCorreo(request):
        sql = "SELECT * FROM usuario WHERE correo = %s"
        correo = request.json['correo']

        conn = mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()

        usuario = None  # Inicializar la variable usuario en caso de error

        try:
            cursor.execute(sql, (correo,))
            result = cursor.fetchone()

            if result:
                usuario = {
                    'correo': result[4],
                    'password': result[5],
                    'id': result[0]
                    # Añade más campos según la estructura de la tabla "usuario"
                }
            cursor.close()
            conn.close()
        except Exception as e:
            print(e)  # Imprimir el error para su diagnóstico
            cursor.close()
            conn.close()

        return usuario


    @staticmethod
    def login():
        usuario = request.get_json()
        correo = usuario.get('correo')
        password = usuario.get('password')

        usuarioLogin = Login.consultarUsuarioCorreo(request)  # Pasar el objeto request a la función consultarUsuarioCorreo()

        print(usuarioLogin)

        if 'correo' not in usuario:
            raise Exception("'correo' no está presente en los datos del usuario")

        # Aquí puedes realizar la lógica de validación del correo y contraseña
        if usuarioLogin is not None and correo == usuarioLogin.get('correo') and password == usuarioLogin.get('password'):
            # Generar el token de autenticación con información adicional (como el ID del usuario)
            token = jwt.encode({'id_usuario': usuarioLogin.get('id')}, 'secreto', algorithm='HS256')

            # Insertar el token en la base de datos
            conn = mysql.connect()
            cursor = conn.cursor()
            fecha_actual = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            insert_query = "INSERT INTO token (user_id, valor, fecha) VALUES (%s, %s, %s)"
            print(insert_query)
            cursor.execute(insert_query, (usuarioLogin.get('id'), token, fecha_actual))
            conn.commit()
            cursor.close()
            conn.close()

            respuesta = {
                'status': 200,
                'valida': 'S',
                'mensaje': 'OK',
                'token': token,  # Convertir el token a cadena de texto
                'id_usuario': usuarioLogin.get('id')
            }
        else:
            respuesta = {
                'status': 400,
                'valida': 'Algo',
                'mensaje': 'El correo o contraseña no son válidos',
                'token': '',
                'id_usuario': None
            }

        response = {
            'respuesta': respuesta,
            'recibido': 'OK'
        }

        return response