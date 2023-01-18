
from Website.Model.Grapich import getallsuhu
from Website.Model.Room import Room
import pyodbc
from Website.config.database import Connect
import json
from random import random
from time import time
from flask import Flask, Blueprint, request, make_response, flash, redirect, url_for
from datetime import timedelta
from flask_login import LoginManager


conn = pyodbc.connect(Connect())
app = Flask(__name__)
app.config['SECRET_KEY'] = 'biasa'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=100000)
app.static_folder = 'static'
app.template_folder = 'templates'
UPLOAD_FOLDER = 'Website/static/image/user_profiles'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'mp4'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def Create_app():

    global COOKIE_TIME_OUT
    # COOKIE_TIME_OUT = 60*60*24*7 #7 days
    COOKIE_TIME_OUT = 60*30  # 5 minutes

    from Website.controller.auth import auth
    from Website.controller.Home import Home
    from Website.Model.Account import User

    app.register_blueprint(Home, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    @login_manager.user_loader
    def load_user(user_id):
        return User.get(user_id)

    return app


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/data', methods=["GET", "POST"])
def data():
    # Data Format
    # [TIME, Temperature, Humidity]

    # Temperature = random() * 100
    # Humidity = random() * 55
    # hour = time() * 1000
    # data = [hour, Humidity]
    # response = make_response(json.dumps(data))
    # response.content_type = 'application/json'
    suhu = getallsuhu()
    data = []

    for row in suhu:
        data.append([row[3], row[5]])

    response = make_response(json.dumps(data, default=str))
    response.content_type = 'application/json'

    return response


@app.route('/data2', methods=["GET", "POST"])
def data2():
    # data ruangan
    ruangan = Room.get_all()
    data = []

    for row in ruangan:
        data.append([row[1], row[0]])

    response = make_response(json.dumps(data, default=str))
    response.content_type = 'application/json'

    return response


# @app.route('/insert', methods=["POST"])
# def insert():
#     if request.method == 'POST':
#         name = request.form['name']
#         email = request.form['email']
#         password = request.form['password']
#         cur = conn.cursor()
#         cur.execute(
#             "INSERT INTO users (name,email,password) VALUES (?,?,?)", (name, email, password))
#         conn.commit()
#         flash("Data Inserted Successfully")
#         return redirect(url_for('insert'))
