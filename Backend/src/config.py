#Clase que contiene las configuraciones específicas para el entorno de desarrollo de la aplicación.
class DevelopmentConfig:
    #Habilita el modo de depuración de Flask, lo que permite mostrar información detallada sobre los errores en el navegador.
    DEBUG = True
    #Datos del servidor MYSQL
    MYSQL_HOST     = '72.167.100.60'
    MYSQL_USER     = 'Proyecto_Integrado_I_user'
    MYSQL_PASSWORD = 'Proyecto_Integrado_I'
    MYSQL_DB       = 'Proyecto_Integrado_I'
    MYSQL_PORT     = 3306

config = {
    #Esta configuración se utiliza para establecer las configuraciones específicas para el entorno de desarrollo en la aplicación Flask.
    'development': DevelopmentConfig
}
