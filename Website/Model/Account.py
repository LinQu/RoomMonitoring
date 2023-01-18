from Website.config.database import Connect
from flask import Flask, Blueprint, render_template, request, redirect, url_for, flash, make_response
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from datetime import timedelta
import pyodbc

db = pyodbc.connect(Connect())

Account = Blueprint('Account', __name__)


def get_user(ident):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM pkr_user WHERE user_id = ?',
                   (ident,)).fetchone()
    return cursor


class User(UserMixin):
    def __init__(self, id, username, password, name, role):
        self.id = id
        self.username = username
        self.password = password
        self.name = name
        self.role = role

    @staticmethod
    def get(user_id):
        cursor = db.cursor()
        user = cursor.execute(
            'SELECT * FROM pkr_user WHERE user_id = ?', (user_id,))
        user = cursor.fetchone()
        if user is None:
            return None
        return User(user[0], user[1], user[2], user[3], user[10])

    @staticmethod
    def get_by_login(usernamee, passwordd):
        cursor = db.cursor()
        user = cursor.execute(
            'SELECT * FROM pkr_user WHERE user_username = ? AND user_password = ?', (usernamee, passwordd))
        user = cursor.fetchone()

        if user is None:
            return None

        return User(user[0], user[1], user[2], user[3], user[10])

    @staticmethod
    def create(username, password, name, role, datebirth, gender, address, email, phone, createby, createdate, placeborn):
        cursor = db.cursor()
        cursor.execute("INSERT INTO pkr_user ( user_username, user_password, user_name, user_date_of_born, user_place_of_born, user_gender, user_address, user_email,user_phone, user_role,user_status, user_create_by,user_create_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", (
            username, password, name, datebirth, placeborn, gender, address, email, phone, role, 1, createby, createdate))

        db.commit()

    def __repr__(self):
        return f"User('{self.id}', '{self.username}', '{self.name}')"

    @staticmethod
    def update(id, username, password, name, role, email, phone, modiby):
        cursor = db.cursor()
        cursor.execute("execute pkr_UpdateUser @p1 = ?,@p2 = ?,@p3 = ?,@p4=?,@p5=?,@p6=?,@p7=?,@p8=?", (
            id, username, password, name, role, email, phone, modiby))
        db.commit()

    @ staticmethod
    def delete(id, status, modiby):
        cursor = db.cursor()
        cursor.execute(
            "execute pkr_UpdateUserStatus @p1 = ?,@p2 = ?,@p3 = ?", (id, status, modiby))
        db.commit()
