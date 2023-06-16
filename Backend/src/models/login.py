from flaskext.mysql import MySQL
from config import config
from flask_cors import CORS
from flask import Flask, jsonify, request
from datetime import datetime
import jwt
import random
import string
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.message import EmailMessage

from flask import Flask, redirect, url_for
from flask_dance.contrib.google import make_google_blueprint, google

# import os
# import pathlib
# import requests
# from google.oauth2 import id_token
# from google_auth_oauthlib.flow import Flow
# from pip._vendor import cachecontrol
# import google.auth.transport.requests


#Se instala PyJWT para poder codificar
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
    
    # @staticmethod
    # def login_google():
    #     authorization_url, state = flow.authorization_url()
    #     session["state"] = state
    #     return redirect(authorization_url)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    @staticmethod
    def recuperarClave(correoR):
        try:
            conn = mysql.connect()  # Establece la conexión a la base de datos
            cursor = conn.cursor()
            print("Conexión exitosa")
            sql = "SELECT concat(nombre, ' ',apellido) as nombre FROM usuario WHERE correo = %s"
            cursor.execute(sql, (correoR,))
            datos = cursor.fetchone()
            nombre = datos[0]
            #print("Resultado de la consulta:", cliente)    
            if  datos is not None:
                # El cliente existe, realiza la actualización
                nuevaClave = generar_dato_aleatorio()
                enviar_cambio_contrasena(nombre, correoR, nuevaClave)
                sql_update = "UPDATE usuario SET password = %s WHERE correo = %s"
                cursor.execute(sql_update, (nuevaClave, correoR,))
                conn.commit()
                print("Actualización exitosa")
            conn.close()
            return True
        except Exception as ex:
            print("Error", ex)
            return False
        
def generar_dato_aleatorio():
    caracteres = string.ascii_lowercase + string.digits
    dato_aleatorio = ''.join(random.choices(caracteres, k=8))
    return dato_aleatorio
  
def enviar_cambio_contrasena(usuario, correo, nueva_clave):
    # Crear el objeto del mensaje
    mensaje = EmailMessage()
    usuario = usuario.title()
 
    # Establecer los campos del mensaje
    mensaje['Subject'] = 'Recuperar contraseña'
    mensaje['From'] = 'pruebasraptorx@gmail.com'
    mensaje['To'] = correo
    mensaje.set_content('''
                <!DOCTYPE html>
                <html>
                    <head>
                        <title></title>
                    </head>
                    <body style="font-family: arial;">
                        <div style="width: 60%;margin-left: auto; margin-right: auto;background: #fff; border-radius: 18px;display:block; float:center;">
                            <div style="margin-left: auto; margin-right: auto;background: #ff9800; border-radius: 18px;display:block; float:center;">
                                <h2 style="padding: 15px;color:#ffffff; font-weight: bold; text-align: center">
                                    SOLICITUD RECUPERACION DE CONTRASEÑA
                                </h2>
                            </div>
                            <div style="">
                                <img style="display:block;margin-left: auto; width: 50%; margin-right: auto;" src="http://icoders.com.co/assets/img/egyptian_gold.png"/>
                            </div>
                            <p style="text-align: left; color: #1f0f0e; line-height: 21px; font-size: 18px;">
                                <span style="font-size: 24px;">
                                    Hola,  ''' + usuario + ''':
                                </span>
                                <br><br><br>
                                Has cambiado tu contraseña y ahora solo tienes que volver a ingresar con los siguientes datos:<br><br>
                                Correo: ''' + correo + '''<br>
                                Contraseña: ''' + nueva_clave + '''
                            </p>
                            <div class="ini" style="margin-left: auto; margin-right: auto; background: #2de135; width: 58%; border-radius: 100px; display: block; float: center;">
                                <style>
                                    .btnA:hover {
                                        border-radius: inherit;
                                        background-color: #2de16a;
                                        margin-left: auto;
                                        margin-right: auto;
                                        display: block;
                                        width: 183px;
                                    }
                                    .btnA a {
                                        width: 183px;
                                        padding: 15px;
                                        color: #ffffff;
                                        font-weight: bold;
                                        text-align: center;
                                        max-width: 200px; /* Ajusta el valor según tus necesidades */
                                        display: inline-block;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }
                                </style>
                                <h3 class="btnA" style="padding: 15px; color: #ffffff; font-weight: bold; text-align: center">
                                    <a href="http://icoders.com.co/#/login/" style="color: #fff;">Iniciar Sesión</a>
                                </h3>
                            </div>                        
                        </div>  
                    </body>
                </html>
            ''', subtype='html')
    # Enviar el mensaje
    with smtplib.SMTP('smtp.gmail.com', 587) as servidor:
        servidor.starttls()
        servidor.login('gmbrayan4@misena.edu.co', 'univalle123')
        servidor.send_message(mensaje)
        print('Correo enviado exitosamente')