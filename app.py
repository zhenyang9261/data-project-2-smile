# Import dependencies
import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy

from grades_d3 import get_data
from filter import get_filter_data
from l_heatmap import getmapdata
from markers import get_mrkdata

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///nc_schools.db"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
MyTable = Base.classes.MyTable

#################################################
# Flask Render Templates
#################################################

# Index page
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

# D3 scatter plot page
@app.route("/get_grades_d3")
def get_grades_d3():
    """Return D3 scatter plot page."""
    return render_template("grades_d3.html")

# Filter table page
@app.route("/get_filter")
def get_filter():
   """Return Filter table page."""
   return render_template("filter_js.html")

# Heat map page
@app.route("/get_mapdata")
def get_mapdata():
    """Return Heat map page."""
    return render_template("l_heatmap.html")

# Map with markers page
@app.route("/get_mrkdata")
def get_data_mrk():
    """Return Map with markers page."""
    return render_template("l_markers.html")

#################################################
# API for data 
#################################################

# API for D3 scatter plots
@app.route("/api/d3")
def ddd():
    """Return the Data for a given database and table."""
    return get_data(db, MyTable)

# API for filter table
@app.route("/api/filter")
def filter():
   """Return the Data for a given database and table."""
   return get_filter_data(db, MyTable)

# API for heat map 
@app.route("/api/mapdata")
def mapdata():
    """Return the Data for a given database and table."""
    return getmapdata(db, MyTable)

# API for map with markers
@app.route("/api/mrkdata")
def mrkdata():
    """Return the Data for a given database and table."""
    data = get_mrkdata(db, MyTable)

    return data

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static', path)

if __name__ == "__main__":
    app.run(debug=True)

