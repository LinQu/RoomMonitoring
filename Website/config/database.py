import pyodbc

db = (
    "Driver={SQL Server Native Client 11.0};"
    "Server=localhost;"
    "Database=pkr;"
    "UID=sa;"
    "PWD=polman;"
)

conn = pyodbc.connect(db)

cursor = conn.cursor()

cursor.execute("SELECT * FROM pkr_user")
row = cursor.fetchone()


def Connect():
    return db
