
from Website import Create_app
import json
from flask import Flask, make_response
from random import random

from time import time

app = Create_app()


if __name__ == '__main__':
    app.run(debug=True)
