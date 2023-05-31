import unittest 
from flask import Flask
from flask.testing import FlaskClient
from flask_cors import CORS
from controllers.criaturas_controller import criaturas_app
from unittest.mock import patch


class CriaturasControllerTestCase(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.config['DEBUG'] = False
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        self.app.register_blueprint(criaturas_app)
        CORS(self.app)

        self.client = self.app.test_client()

    def tearDown(self):
        # Limpiar datos o realizar acciones posteriores a las pruebas
        pass
    
    #Listar criaturas
    def test_listarCriaturas(self):
        with patch('controllers.criaturas_controller.Criaturas.listarCriaturas', return_value={'id': 1, 'nombre': 'Criatura1'}):
            response = self.client.get('/criaturas')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('criaturas', data)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], 'Lista de criaturas egipcias')
        
    def test_getDiosesImgById_existing_id(self):
        # Mock the Criaturas.getCriaturaById method to return a valid criatura
        with patch('controllers.criaturas_controller.Criaturas.getCriaturaById', return_value=['imagen1.jpg', 'imagen2.jpg']):
            response = self.client.get('/criaturasById/1')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('criatura', data)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], 'Lista de imagenes de criaturas egipcias')

    
    def test_getGodById_valid_id(self):
        # Mock the Criaturas.getCriaturaImgById method to return a valid list of images
        with patch('controllers.criaturas_controller.Criaturas.getCriaturaImgById', return_value=['dios1.jpg', 'dios2,jpg']):
            response = self.client.get('/criaturasImgById/1')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('imagenes', data)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], 'Se encontro la criatura')





            
if __name__ == '__main__':
    unittest.main()













