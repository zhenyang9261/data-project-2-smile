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
    sel = [
       table.district_name,
       table.school_name,
       table.school_type_txt,
       table.spg_score,
       table.lat,
       table.lon,
       table.calendar_only_txt,
       table.student_num
   ]
   
    results = db.session.query(*sel).all()
    results_data_list = []

    for result in results:
       result_data_dict = {}
       result_data_dict["district_name"] = result[0]
       result_data_dict["school_name"] = result[1]
       result_data_dict["school_type_txt"] = result[2]
       result_data_dict["spg_score"] = result[3]
       result_data_dict["lat"] = result[4]
       result_data_dict["lon"] = result[5]
       result_data_dict["calendar_only_txt"] = result[6]
       result_data_dict["student_num"] = result[7]

       results_data_list.append(result_data_dict)

    return jsonify(results_data_list)

