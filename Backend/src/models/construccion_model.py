import config
class Construccion:
    def __init__(self, codigo, nombre, resumen, historia, ubicacion, lugar, fecha):
        self.codigo = codigo
        self.nombre = nombre
        self.resumen = resumen
        self.historia = historia
        self.ubicacion = ubicacion
        self.lugar = lugar
        self.fecha = fecha

    def obtener_construcciones(self):
        # Lógica para obtener las construcciones desde la base de datos u otra fuente de datos
        # Por ejemplo:
        conn = config.mysql.connect()  # Establece la conexión a la base de datos
        cursor = conn.cursor()
        sql = "SELECT * FROM arquitectura"
        cursor.execute(sql)
        datos = cursor.fetchall()
        construcciones = []
        for fila in datos:
            construccion = {
                'cod': fila[0],
                'nombre': fila[1],
                'resumen': fila[2],
                'historia': fila[3],
                'ubicacion': fila[4],
                'lugar': fila[5],
                'fecha': fila[6]
            }
            construcciones.append(construccion)
        conn.close()  # Cierra la conexión a la base de datos
        return construcciones