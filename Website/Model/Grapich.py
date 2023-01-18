from Website.config.database import Connect
from flask import Flask, Blueprint, render_template, request, redirect, url_for, flash, make_response
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from datetime import timedelta
import pyodbc


db = pyodbc.connect(Connect())


def getallsuhu():
    cursor = db.cursor()
    cursor.execute('exec pkr_SelectAllLog @p1 = ?,@p2 = ?,@p3 = ?',
                   ("2021-11-20", "2021-12-20", 13,))
    result = cursor.fetchall()
    return result


def getallkelembaban():
    cursor = db.cursor()
    cursor.execute('exec pkr_SelectAllLog @p1 = ?,@p2 = ?,@p3 = ?',
                   ("2021-11-20", "2021-12-20", 14,))
    result = cursor.fetchall()
    return result
