import unittest
from flask import Flask
from flaskext.mysql import MySQL
from config import config

class MainTestCase(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.config['MYSQL_DATABASE_HOST'] = config['development'].MYSQL_HOST
        self.app.config['MYSQL_DATABASE_USER'] = config['development'].MYSQL_USER
        self.app.config['MYSQL_DATABASE_PASSWORD'] = config['development'].MYSQL_PASSWORD
        self.app.config['MYSQL_DATABASE_DB'] = config['development'].MYSQL_DB
        self.app.config['MYSQL_DATABASE_PORT'] = config['development'].MYSQL_PORT
        self.mysql = MySQL(self.app)

    def test_database_connection(self):
        with self.app.app_context():
            conn = self.mysql.connect()
            self.assertIsNotNone(conn)
            conn.close()

if __name__ == '__main__':
    unittest.main()
