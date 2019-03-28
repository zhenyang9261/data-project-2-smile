import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

from grades_d3 import get_data

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

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/get_grades_d3")
def get_grades_d3():
    """Return the homepage."""
    return render_template("grades_d3.html")

@app.route("/api/d3")
def ddd():
    """Return the MetaData for a given sample."""
#    stmt = db.session.query(MyTable).statement
# 
#    df = pd.read_sql_query(stmt, db.session.bind)
#
#    # Filter the data based on the sample number and
#    # only keep rows with values above 1
#    # sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
#    # Format the data to send as json
#    data = {
#        "district_name": df.district_name.tolist(),
#        "spg_score": df.spg_score.tolist(),
#        "calc_student_teach_ratio": df.calc_student_teach_ratio.tolist(),
#    }
    return get_data(db, MyTable)



#     sel = [
#         MyTable.district_name,
#         MyTable.spg_score,
#         MyTable.calc_student_teach_ratio
#     ]
# 
#     results = db.session.query(*sel).all()
# 
#     # Create a dictionary entry for each row of metadata information
#     result_data = {}
#     for result in results:
#         result_data["district_name"] = result[0]
#         result_data["spg_score"] = result[1]
#         result_data["calc_student_teach_ratio"] = result[2]
# 
#     print(result_data)
#     return jsonify(result_data)

if __name__ == "__main__":
    app.run()
