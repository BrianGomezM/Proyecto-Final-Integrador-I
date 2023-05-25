from app import db

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(30))
    apellido = db.Column(db.String(30))
    telefono = db.Column(db.String(30))
    correo = db.Column(db.String(100))
    password = db.Column(db.String(300))
    urlAvatar = db.Column(db.String(300))