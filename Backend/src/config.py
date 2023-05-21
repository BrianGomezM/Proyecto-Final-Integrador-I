class DevelopmentConfig(): #configuracion de desarrollo
    DEBUG = True
    #Datos del servidor MYSQL
    MYSQL_HOST     = 'localhost'
    MYSQL_USER     = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB       = 'Proyecto_Integrado_I'
    MYSQL_PORT     = 3306

config = {
    'development' : DevelopmentConfig
}