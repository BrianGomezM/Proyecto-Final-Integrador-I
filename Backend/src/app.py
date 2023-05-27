from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS
from flaskext.mysql import MySQL
from config import config
from controllers.arquitectura_controller import arquitectura_app

#FIRMA DE LA CLASE APP.PY
#configurar y ejecutar una aplicación Flask que proporciona una API web. 
# La aplicación se encarga de manejar las rutas y las solicitudes HTTP, así como de interactuar con una base de datos MySQL.

# Instancia de la aplicación Flask.
app = Flask(__name__)

#Habilita el manejo de solicitudes de recursos cruzados (CORS) para permitir peticiones desde dominios diferentes al de la aplicación.
CORS(app)

#Configuraciones de conexión a la base de datos MySQL obtenidas del archivo de configuración.
app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB

#Registra el blueprint 
#en la aplicación Flask, lo que significa que las rutas y controladores definidos en el blueprint estarán disponibles en la aplicación.
app.register_blueprint(arquitectura_app)

# Función que maneja el error 404 (página no encontrada) y devuelve una respuesta HTML con un mensaje correspondiente.
def pagina_no_encontrada(error):
    return "<h1>La página que intentas buscar no existe....</h1>"

if __name__ == '__main__':

    # Carga las configuraciones específicas para el entorno de desarrollo en la aplicación Flask.
    app.config.from_object(config['development'])

    #Registra la función 
    #como manejador para el error 404 en la aplicación.
    app.register_error_handler(404, pagina_no_encontrada)

    # Inicia la aplicación Flask y la ejecuta en el servidor local.
    app.run()
