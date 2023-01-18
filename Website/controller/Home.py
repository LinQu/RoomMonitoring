from flask import Blueprint, render_template, flash, request, redirect, url_for
from datetime import date
from flask_login import login_required, current_user
from Website.config.database import Connect
from Website.Model.Account import User
from Website.Model.Room import Room
from Website.Model.Device import Device
from Website import app, allowed_file
import os
import pyodbc
from werkzeug.utils import secure_filename

db = pyodbc.connect(Connect())

Home = Blueprint('Home', __name__)


# if error 404
@Home.errorhandler(404)
def page_not_found(e):
    return render_template('/Erorr/access.html'), 404


@Home.route('/', methods=['GET', 'POST'])
@login_required
def home():
    result = Room.get_all()
    return render_template('home.html', user=current_user, result=result)


@Home.route('/Ruangan')
@login_required
def crudlocation():
    result = Room.get_all()
    sensor = Room.get_sensorall()
    # ke folder CRUDLocation file index
    return render_template('/Ruangan/index.html', user=current_user, result=result, sensor=sensor, show_predictions_modal=True)


@Home.route('/Ruangan/<id>')
@login_required
def detaillocation(id):
    result = Room.get_roombyid(id)
    #top5 = Room.get_top5(id)
    ruangan = Room.get_all()
    sensor = Room.get_sensorbylocation(id)
    all_sensor = Device.getAllSensor()
    device = Device.get_devicebylocation(id)
    video = Room.get_video(id)
    return render_template('/Ruangan/detail.html', allsensor=all_sensor, ruangan=ruangan,  user=current_user, result=result, sensor=sensor, device=device, video=video)


@Home.route('/Ruangan/UpdateStatus', methods=['GET', 'POST'])
@login_required
def updatestatus():
    if request.method == 'POST':
        id = request.form.get('id')
        status = request.form.get('status')
        Device.updatestatus(id, status)
        # refresh page
        return redirect(url_for('Home.crudlocation'))


@Home.route('/Ruangan/TambahRuangan', methods=['POST'])
@login_required
def tambahRuangan():
    # mengambil id akun session
    createby = current_user.id
    name = request.form.get('nama')
    video = request.files['video']

    if video.filename == '':
        flash('Video tidak boleh kosong', 'danger')
        return redirect(url_for('Home.crudlocation'))

    if video and allowed_file(video.filename):
        try:
            Room.create(name, createby)
            filename = secure_filename(video.filename)
            video.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            nameloc = "video/"+filename
            location = Room.get_lastlocation()
            Room.create_video(location.location_id, nameloc)
            flash('Ruangan berhasil dibuat', 'success')
        except Exception as e:
            print(e)
            flash('Gagal Menambahkan Ruangan', 'danger')
    else:
        flash('Gagal Menambahkan Ruangan', 'danger')
    return redirect(url_for('Home.crudlocation'))


@Home.route('/Ruangan/UbahRuangan', methods=['POST'])
@login_required
def ubahRuangan():
    # mengambil id akun session
    id = request.form.get('id')
    name = request.form.get('nama')
    modifby = current_user.id
    try:
        Room.update(name, id, modifby)
        flash('Ruangan berhasil diubah', 'success')

    except Exception as e:
        print(e)
        flash('Gagal Mengubah Ruangan', 'danger')

    return redirect(url_for('Home.crudlocation'))


@Home.route('/Ruangan/HapusRuangan', methods=['POST'])
@login_required
def hapusRuangan():
    # mengambil id akun session
    id = request.form.get('id')
    modifby = current_user.id
    try:
        Room.delete(id, modifby)
        flash('Ruangan berhasil dihapus', 'success')

    except Exception as e:
        print(e)
        flash('Gagal Menghapus Ruangan', 'danger')

    return redirect(url_for('Home.crudlocation'))


@Home.route('/Grapich/Suhu')
@login_required
def grapichsuhu():
    jenis = "Suhu"
    sensor = Device.getAllSensor()
    return render_template('/Grapich/index.html', sensor=sensor, user=current_user, result=jenis)


@Home.route('/Grapich/Suara')
@login_required
def grapichsuara():
    jenis = "Kebisingan"
    sensor = Device.getAllSensor()
    return render_template('/Grapich/index.html', sensor=sensor, user=current_user, result=jenis)


@Home.route('/Grapich/Cahaya')
@login_required
def grapichcahaya():
    jenis = "Pencahayaan"
    sensor = Device.getAllSensor()
    return render_template('/Grapich/index.html', sensor=sensor, user=current_user, result=jenis)


@Home.route('/Grapich/Jumlah')
@login_required
def grapichjumlah():
    jenis = "Jumlah Orang"
    sensor = Device.getAllSensor()
    return render_template('/Grapich/index.html', sensor=sensor, user=current_user, result=jenis)


@Home.route('/Grapich/Kelembaban')
@login_required
def grapichlembab():
    jenis = "Kelembaban"
    sensor = Device.getAllSensor()
    return render_template('/Grapich/index.html', sensor=sensor, user=current_user, result=jenis)


@Home.route('/User')
@login_required
def cruduser():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM pkr_user where user_status = 1")
    result = cursor.fetchall()
    # ke folder CRUDUser file index
    user = current_user
    if user.role == 1:
        return render_template('MasterUser/index.html', user=current_user, result=result, show_predictions_modal=True)
    else:
        return render_template('Error/access.html', user=current_user, result=result)


@Home.route('/User/TambahUser', methods=['POST'])
@login_required
def tambahAkun():
    # mengambil id akun session
    createby = current_user.id
    username = request.form.get('username')
    password = request.form.get('password')
    role = request.form.get('role')
    name = request.form.get('nama')
    datebirth = request.form.get('tglahir')
    placeborn = request.form.get('tempat_lahir')
    gender = request.form.get('kelamin')
    address = request.form.get('alamat')
    email = request.form.get('email')
    phone = request.form.get('nohp')
    datenow = str(date.today())

    try:
        User.create(username, password, name, role, datebirth, gender,
                    address, email, phone, createby, datenow, placeborn)

        flash('Akun berhasil dibuat', 'success')

    except:
        flash('Gagal Menambahkan Akun', 'danger')

    return redirect(url_for('Home.cruduser'))


@Home.route('/User/UbahUser', methods=['POST'])
@login_required
def ubahAkun():
    modifby = current_user.id
    id = request.form.get('id')
    username = request.form.get('username')
    password = request.form.get('password')
    role = request.form.get('role')
    name = request.form.get('nama')

    email = request.form.get('email')
    nohp = request.form.get('nohp')

    try:
        User.update(id, username, password, name, role, email, nohp, modifby)
        flash('Akun berhasil diubah', 'success')
    except:
        flash('Gagal Mengubah Akun', 'danger')
    return redirect(url_for('Home.cruduser'))


@Home.route('/User/HapusUser', methods=['POST'])
@login_required
def deleteAkun():
    modiby = current_user.id
    id = request.form.get('id')
    status = 0
    User.delete(id, status, modiby)
    flash('Akun berhasil dihapus', 'success')
    return redirect(url_for('Home.cruduser'))


@Home.route('/Device')
@login_required
def cruddevice():
    lokasi = Room.get_all()
    result = Device.getAll()
    sensor = Device.getAllSensor()
    # ke folder CRUDDevice file index
    return render_template('MasterDevice/index.html', sensor=sensor, lokasi=lokasi, user=current_user, result=result, show_predictions_modal=True)


@Home.route('/Device/TambahDevice', methods=['POST'])
@login_required
def tambahDevice():
    # mengambil id akun session
    createby = current_user.id
    name = request.form.get('nama')
    location = request.form.get('lokasi')
    image = request.files['gambar']
    sensor = request.form.get('sensor')

    try:
        if image.filename == '':
            flash('Tidak ada gambar yang dipilih', 'danger')
            return redirect(url_for('Home.cruddevice'))
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            nameloc = "user_profiles/" + filename
            Device.saveDevice(name, nameloc, location, createby)
            deviceid = Device.getlastdevice()
            # print(deviceid.device_id)
            Device.saveDeviceSensor(deviceid.device_id, sensor)
            flash('Alat berhasil dibuat', 'success')
    except Exception as e:
        # pesan kesalahan
        print(e)

        flash('Gagal Menambahkan Alat', 'danger')

    return redirect(url_for('Home.cruddevice'))


@Home.route('/Device/UbahDevice', methods=['POST'])
@login_required
def ubahDevice():
    modifby = current_user.id
    id = request.form.get('id')
    name = request.form.get('nama')
    location = request.form.get('lokasi1')
    tempimage = request.form.get('tempimage')
    image = request.files['gambar1']

    try:
        if image.filename == '':
            # set null image
            Device.updateDevice(name, location, id, modifby, tempimage)
            flash('Alat berhasil diubah', 'success')
        else:
            if image and allowed_file(image.filename):
                filename = secure_filename(image.filename)
                image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                nameloc = "user_profiles/" + filename
                Device.updateDevice(name, location, id, modifby, nameloc)
                flash('Alat berhasil diubah', 'success')
    except Exception as e:
        # pesan kesalahan
        print(e)

        flash('Gagal Mengubah Alat', 'danger')

    return redirect(url_for('Home.cruddevice'))


@Home.route('/Device/HapusDevice', methods=['POST'])
@login_required
def deleteDevice():
    modiby = current_user.id
    id = request.form.get('id')
    status = 0
    Device.deleteDevice(id, status)
    flash('Alat berhasil dihapus', 'success')
    return redirect(url_for('Home.cruddevice'))


@Home.route('/Device/UbahStatus', methods=['POST'])
@login_required
def ubahStatus():
    modifby = current_user.id
    id = request.form.get('id')
    status = request.form.get('status')
    room = request.form.get('room')
    Device.updatestatus(id, status)
    flash('Status berhasil diubah', 'success')
    return redirect(url_for('Home.detaillocation', id=room))
