import unittest
from flask import Flask
from flask_cors import CORS
from controllers.arquitectura_controller import arquitectura_app
from controllers.dioses_controller import dioses_app
from controllers.criaturas_controller import criaturas_app
from controllers.controllerLogin import login_app
from controllers.controllerUsuario import usuario_app
from config import config

# Instancia de la aplicación Flask.
app = Flask(__name__)

# Habilita el manejo de solicitudes de recursos cruzados (CORS) para permitir peticiones desde dominios diferentes al de la aplicación.
CORS(app)

# Función que maneja el error 404 (página no encontrada) y devuelve una respuesta HTML con un mensaje correspondiente.
@app.errorhandler(404)
def pagina_no_encontrada(error):
    return "<h1>La pagina que intentas buscar no existe....</h1>"

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.testing = True

        # Registra el manejador de error en la aplicación de prueba
        self.app.register_error_handler(404, pagina_no_encontrada)

    def test_registrar_blueprints(self):
        self.app.register_blueprint(arquitectura_app)
        self.app.register_blueprint(dioses_app)
        self.app.register_blueprint(criaturas_app)
        self.app.register_blueprint(usuario_app)
        self.app.register_blueprint(login_app)

        self.assertIn(arquitectura_app, self.app.blueprints.values())
        self.assertIn(dioses_app, self.app.blueprints.values())
        self.assertIn(criaturas_app, self.app.blueprints.values())
        self.assertIn(usuario_app, self.app.blueprints.values())
        self.assertIn(login_app, self.app.blueprints.values())



if __name__ == '__main__':
    # Carga las configuraciones específicas para el entorno de desarrollo en la aplicación Flask.
    app.config.from_object(config['development'])

    # Registra la función como manejador para el error 404 en la aplicación principal.
    app.register_error_handler(404, pagina_no_encontrada)


    # Ejecuta las pruebas
    unittest.main()
