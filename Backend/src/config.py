#Clase que contiene las configuraciones específicas para el entorno de desarrollo de la aplicación.
class DevelopmentConfig:
    #Habilita el modo de depuración de Flask, lo que permite mostrar información detallada sobre los errores en el navegador.
    DEBUG = True

    # Dirección del servidor MySQL.
    MYSQL_HOST = 'localhost'

    #Nombre de usuario para acceder al servidor MySQL
    MYSQL_USER = 'root'

    #Contraseña del usuario para acceder al servidor MySQL.
    MYSQL_PASSWORD = ''

    #Nombre de la base de datos MySQL utilizada por la aplicación.
    MYSQL_DB = 'Proyecto_Integrado_I'

    #Puerto en el que el servidor MySQL está escuchando.
    MYSQL_PORT = 3306
#instancia de la clase 
config = {
    #Esta configuración se utiliza para establecer las configuraciones específicas para el entorno de desarrollo en la aplicación Flask.
    'development': DevelopmentConfig
}
