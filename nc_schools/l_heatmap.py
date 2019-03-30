import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

def getmapdata(db, table):

    stmt = db.session.query(table).statement
# 
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    # sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
    # Format the data to send as json
    data = {
        "district_name": df.district_name.tolist(),
        "spg_score": df.spg_score.tolist(),
        "calc_student_teach_ratio": df.calc_student_teach_ratio.tolist(),
    }

    return jsonify(data);