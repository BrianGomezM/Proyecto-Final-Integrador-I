import unittest
from flask import Flask
from flask.testing import FlaskClient
from flask_cors import CORS
from controllers.controllerLogin import login_app
from unittest.mock import patch





class LoginControllerTestCase(unittest.TestCase):
    
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

    
    def test_login_exitoso(self):
        # Simular el comportamiento de la función login
        with patch('controllers.controllerLogin.Login.login') as mock_login:
            mock_login.return_value = {'correo': 'algo@gmail.com', 'password':'1234'}

            response = self.client.post('/login')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('respuesta', data)
            self.assertEqual(data['respuesta'], 'Se registró correctamente')

    def test_login_error(self):
        # Simular el comportamiento de la función login
        with patch('controllers.controllerLogin.Login.login') as mock_login:
            mock_login.return_value = None

            response = self.client.post('/login')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('respuesta', data)
            self.assertEqual(data['respuesta'], 'El correo o contraseña no son válidos')

    
    
    
if __name__ == '__main__':
    unittest.main()
