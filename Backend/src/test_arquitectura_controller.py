import unittest
from flask import Flask
from flask.testing import FlaskClient
from flask_cors import CORS
from controllers.arquitectura_controller import arquitectura_app
from unittest.mock import patch

class ArquitecturaControllerTestCase(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.config['DEBUG'] = False
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        self.app.register_blueprint(arquitectura_app)
        CORS(self.app)

        self.client = self.app.test_client()

    def tearDown(self):
        # Limpiar datos o realizar acciones posteriores a las pruebas
        pass


    #Listar construcciones
    def test_listar_construcciones(self):
        response = self.client.get('/arquitectura')
        data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertIn('construcciones', data)
        self.assertIn('mensaje', data)
        self.assertEqual(data['mensaje'], 'Lista de construcciones egipcias')
        
     
 
            
    #buscar construcciones    
    def test_buscar_construccion_existente(self):
        # Simular el comportamiento de la función buscar_construccion
        with patch('controllers.arquitectura_controller.Arquitectura.buscar_construccion', return_value={'codigo': '123', 'nombre': 'Construcción 1'}):
            response = self.client.get('/arquitectura/123')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('construccion', data)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], 'Se encontró la construcción')

    
    
    #Registrar construcción
    def test_registrar_construccion_exitoso(self):
        # Simular el comportamiento de la función registrar_construccion
        with patch('controllers.arquitectura_controller.Arquitectura.registrar_construccion', return_value=True):
            response = self.client.post('/arquitectura', json={'nombreConstruccion': 'Construcción 1'})
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], 'Se registró correctamente') 
    
    #Eliminar construcción
    def test_eliminar_construccion_exitoso(self):
        # Simular el comportamiento de la función eliminar_construccion
        with patch('controllers.arquitectura_controller.Arquitectura.eliminar_construccion', return_value=True):
            response = self.client.delete('/arquitectura/123')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], 'Construcción eliminada correctamente')


    
    
    
    #Actualizar construcción
    def test_actualizar_construccion_exitoso(self):
        # Simular el comportamiento de la función actualizar_construccion
        with patch('controllers.arquitectura_controller.Arquitectura.actualizar_construccion', return_value=True):
            response = self.client.put('/arquitectura/123', json={'nombreConstruccion': 'Nuevo Nombre'})
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], 'Construcción actualizada correctamente')

    #Listar construccionesIMG
    def test_listar_construccionesIMG_exitoso(self):
        # Simular el comportamiento de la función listar_construccionesIMG
        with patch('controllers.arquitectura_controller.Arquitectura.listar_construccionesIMG', return_value=['imagen1.jpg', 'imagen2.jpg']):
            response = self.client.get('/arquitecturaIMG/123')
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertIn('construcciones', data)
            self.assertIn('mensaje', data)
            self.assertEqual(data['mensaje'], 'Lista imagenes de construcciones egipcias')
            self.assertEqual(data['construcciones'], ['imagen1.jpg', 'imagen2.jpg'])



if __name__ == '__main__':
    unittest.main()
