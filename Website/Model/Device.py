from Website.config.database import Connect
from flask import Flask, Blueprint, render_template, request, redirect, url_for, flash, make_response
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from datetime import timedelta
import pyodbc

db = pyodbc.connect(Connect())

Device = Blueprint('Device', __name__)


def get_device(ident):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM pkr_device WHERE device_id = ?',
                   (ident,)).fetchone()
    return cursor


class Device(UserMixin):
    def __init__(self, id, description, location):
        self.id = id
        self.description = description
        self.location = location

    @staticmethod
    def getAll():
        cursor = db.cursor()
        cursor.execute('exec pkr_GetDeviceAll')
        result = cursor.fetchall()
        return result

    def getAllSensor():
        cursor = db.cursor()
        cursor.execute('select * from pkr_sensor')
        result = cursor.fetchall()
        return result

    def saveDevice(description, image, location, createby):
        cursor = db.cursor()
        cursor.execute('exec pkr_AddDevice @p1 = ?,@p2 = ?,@p3 = ?,@p4 = ?',
                       (description, location, image, createby,))
        db.commit()

    def getlastdevice():
        cursor = db.cursor()
        cursor.execute('exec pkr_GetLastIDDevice')
        result = cursor.fetchone()
        return result

    def saveDeviceSensor(deviceid, sensorid):
        cursor = db.cursor()
        cursor.execute('exec pkr_AddDeviceSensor @p1 = ?,@p2 = ?',
                       (deviceid, sensorid,))
        db.commit()

    def updateDevice(description, location, deviceid, modifyby, image,):
        cursor = db.cursor()
        cursor.execute('exec pkr_UpdateDevice @p1 = ?,@p2 = ?,@p3 = ?,@p4 = ? ,@p5 = ?',
                       (deviceid, description, location, image, modifyby,))
        db.commit()

    def deleteDevice(deviceid, devicestatus):
        cursor = db.cursor()
        cursor.execute('exec pkr_UpdateDeviceSensorStatus @p1 = ?,@p2 = ?',
                       (deviceid, devicestatus,))
        db.commit()

    def get_devicebylocation(ident):
        cursor = db.cursor()
        cursor.execute('exec pkr_GetDeviceByLocation @p1 = ?', (ident,))
        result = cursor.fetchall()
        return result

    def updatestatus(deviceid, status):
        cursor = db.cursor()
        cursor.execute('exec pkr_UpdateDeviceSensorStatus @p1 = ?,@p2 = ?',
                       (deviceid, status,))
        db.commit()
