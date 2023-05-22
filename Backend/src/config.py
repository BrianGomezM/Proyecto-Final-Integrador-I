class DevelopmentConfig(): #configuracion de desarrollo
    DEBUG = True
    #Datos del servidor MYSQL
    MYSQL_HOST     = '72.167.100.60'
    MYSQL_USER     = 'Proyecto_Integrado_I_user'
    MYSQL_PASSWORD = 'Proyecto_Integrado_I'
    MYSQL_DB       = 'Proyecto_Integrado_I'
    MYSQL_PORT     = 3306

config = {
    'development' : DevelopmentConfig
}