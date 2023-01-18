from Website.config.database import Connect
from flask import Flask, Blueprint, render_template, request, redirect, url_for, flash, make_response
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from datetime import timedelta
import pyodbc


db = pyodbc.connect(Connect())


Room = Blueprint('Room', __name__)


def get_room(ident):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM pkr_room WHERE room_id = ?',
                   (ident,)).fetchone()
    return cursor


class Room(UserMixin):
    def __init__(self, id, name, status, createby, createdate):
        self.id = id
        self.name = name
        self.status = status
        self.createby = createby
        self.createdate = createdate

    @staticmethod
    def get(room_id):
        cursor = db.cursor()
        room = cursor.execute(
            'SELECT * FROM pkr_room WHERE room_id = ?', (room_id,))
        room = cursor.fetchone()
        if room is None:
            return None
        return Room(room[0], room[1], room[2], room[3], room[4])

    @staticmethod
    def get_all():
        cursor = db.cursor()
        room = cursor.execute(
            'SELECT location_id,location_name,location_status , user_name , location_create_date FROM pkr_location inner join pkr_user on pkr_location.location_create_by = pkr_user.user_id where location_status = 1')
        room = cursor.fetchall()
        if room is None:
            return None
        return room

    @staticmethod
    def get_sensorbylocation(ident):
        cursor = db.cursor()
        cursor.execute('exec pkr_GetSensorByLocation @p1 = ?', (ident,))
        result = cursor.fetchall()
        return result

    @staticmethod
    def get_sensorall():
        cursor = db.cursor()
        cursor.execute('exec pkr_GetSensorAll')
        result = cursor.fetchall()
        return result

    @staticmethod
    def get_top5():
        cursor = db.cursor()
        cursor.execute('exec pkr_GetTop5')
        result = cursor.fetchall()
        return result

    @staticmethod
    def get_valuesensor(ident):
        cursor = db.cursor()
        cursor.execute('exec pkr_GetLogValueBySensorId @p1 = ?', (ident,))
        result = cursor.fetchall()
        return result

    @staticmethod
    def create(name, createby):
        cursor = db.cursor()
        cursor.execute('exec pkr_AddLocation @p1 = ?,@p2 = ?',
                       (name, createby,))
        db.commit()

    @staticmethod
    def create_video(ident, video):
        cursor = db.cursor()
        cursor.execute('exec pkr_AddVideo @p1 = ?,@p2 = ?',
                       (ident, video,))
        db.commit()

    @staticmethod
    def get_lastlocation():
        cursor = db.cursor()
        cursor.execute('exec pkr_GetLastLocation')
        result = cursor.fetchone()
        return result

    @staticmethod
    def update(name, ident, modifyby):
        cursor = db.cursor()
        cursor.execute('exec pkr_UpdateLocation @p1 = ?,@p2 = ?,@p3 = ?',
                       (ident, name, modifyby,))
        db.commit()

    @staticmethod
    def delete(ident, modifyby):
        status = 0
        cursor = db.cursor()
        cursor.execute('exec pkr_UpdateLocationStatus @p1 = ?,@p2 = ?,@p3 = ?',
                       (ident, status, modifyby,))
        db.commit()

    @staticmethod
    def get_roombyid(ident):
        cursor = db.cursor()
        cursor.execute('exec pkr_GetLocationByID @p1 = ?', (ident,))
        result = cursor.fetchone()
        return result

    @staticmethod
    def get_video(ident):
        cursor = db.cursor()
        cursor.execute('exec pkr_GetVideoByLocation @p1 = ?', (ident,))
        result = cursor.fetchall()
        if result is None:
            return None
        return result
