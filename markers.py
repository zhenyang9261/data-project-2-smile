import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

def get_mrkdata(db, table):

    stmt = db.session.query(table).statement
# 
    df = pd.read_sql_query(stmt, db.session.bind)

    # Format the data to send as JSON

    data = {
        "district_name": df.district_name.tolist(),
        "school_type": df.school_type_txt.tolist(),
        "spg_score": df.spg_score.tolist(),
        "school_calendar": df.calendar_only_txt.tolist(),
        "student_body": df.student_num.tolist(),
        "lat": df.lat.tolist(),
        "lon": df.lon.tolist()
    }

    return jsonify(data)

