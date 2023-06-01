import unittest
from flask import Flask
from flask.testing import FlaskClient
from flask_cors import CORS
from controllers.controllerLogin import login_app
from unittest.mock import patch
from models.usuario import Usuario




class UsuarioControllerTestCase(unittest.TestCase):
    
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.config['DEBUG'] = False
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        self.app.register_blueprint(login_app)
        CORS(self.app)

        self.client = self.app.test_client()

    def tearDown(self):
        # Limpiar datos o realizar acciones posteriores a las pruebas
        pass
    def test_registrar_usuario_exitoso(self):
        # Datos de ejemplo para la prueba
        usuario = {
            'nombre': 'John',
            'apellido': 'Doe',
            'telefono': '123456789',
            'correo': 'john@example.com',
            'password': 'password',
            'urlAvatar': 'http://example.com/avatar.jpg',
            'sexo': 'M'
        }

        # Simular la solicitud y la conexión a la base de datos
        with self.app.test_request_context(json=usuario):
            with patch('models.usuario.Usuario.guardar_usuario', return_value={'mensaje': 'El usuario se registró correctamente'}):
                response = Usuario.registrar_usuario()
                data = response.get_json()

                self.assertEqual(response.status_code, 200)
                self.assertIn('mensaje', data)
                self.assertEqual(data['mensaje'], 'El usuario se registró correctamente')

    def test_registrar_usuario_error(self):
        # Datos de ejemplo para la prueba
        usuario = {
            'apellido': 'Doe',
            'telefono': '123456789',
            'correo': 'john@example.com',
            'password': 'password',
            'urlAvatar': 'http://example.com/avatar.jpg',
            'sexo': 'M'
        }

        # Simular la solicitud y la conexión a la base de datos
        with self.app.test_request_context(json=usuario):
            response = Usuario.registrar_usuario()
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], "'nombre' no está presente en los datos del usuario")
    


    
if __name__ == '__main__':
    unittest.main()
