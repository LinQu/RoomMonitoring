
from flask_login import login_user, login_required, logout_user, current_user
from flask import Blueprint, render_template, request, redirect, url_for, flash, make_response
from Website.config.database import Connect
from Website.Model.Account import User
from Website import COOKIE_TIME_OUT
import pyodbc

db = pyodbc.connect(Connect())

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.form.get('username')
        password = request.form.get('password')
        remember = True if request.form.get('remember') else False

        user = User.get_by_login(user, password)
        if user:

            if remember:
                resp = make_response(redirect(url_for('view.home')))
                resp.set_cookie('username', user.username,
                                max_age=COOKIE_TIME_OUT)
                resp.set_cookie('password', user.password,
                                max_age=COOKIE_TIME_OUT)
                resp.set_cookie('remember', 'checked', max_age=COOKIE_TIME_OUT)
                return resp

            login_user(user, remember=remember)
            return redirect(url_for('Home.home'))
        else:
            flash('Username atau Password Salah.', category='error')

    return render_template('login.html', user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/sign-up')
def sign_up():
    return '<h1>Sign Up</h1>'
