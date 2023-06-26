from flask import Flask
from flaskext.mysql import MySQL
from config import config
from controllers import construcciones_controller
app = Flask(__name__)

# Configuración de la conexión a la base de datos MySQL
app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB
app.config['MYSQL_DATABASE_PORT'] = config['development'].MYSQL_PORT

mysql = MySQL(app)

# Importa y registra los controladores

app.register_blueprint(construcciones_controller.bp)
