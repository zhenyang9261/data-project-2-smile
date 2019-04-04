import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

def get_filter_data(db, table):

    results = db.session.query(
       table.full_address, 
      #  table.lon,
      #  table.lat,
       table.school_code,
       table.district_name, 
       table.school_name,
       table.grade, 
       table.spg_score, 
       table.crime_per_c_num,
      #  table.szip_ad, 
       table.school_type_txt, 
      #  table.calendar_only_txt,
       table.student_num, 
      #  table.class_teach_num,
       table.calc_student_teach_ratio,
      #  table.state_ppe, 
       table.federal_ppe, 
      #  table.local_ppe,
       table.total_ppe,
      ).all()
   #results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

   # Create a dictionary entry for each row of metadata information
    results_data_list = []

    for result in results:
       result_data_dict = {}
      
       result_data_dict["full_address"] = result[0]
       result_data_dict["school_code"] = result[1]
       result_data_dict["district_name"] = result[2]
       result_data_dict["school_name"] = result[3]
       result_data_dict["grade"] = result[4]
       result_data_dict["spg_score"] = result[5]
       result_data_dict["crime_per_c_num"] = result[6]
      #  result_data_dict["szip_ad"] = result[7]
       result_data_dict["school_type_txt"] = result[7]
       result_data_dict["student_num"] = result[8]
       result_data_dict["calc_student_teach_ratio"] = result[9]
       result_data_dict["federal_ppe"] = result[10]
       result_data_dict["total_ppe"] = result[11]
      #  result_data_dict["full_address"] = result[0]
      #  result_data_dict["lon"] = result[1]
      #  result_data_dict["lat"] = result[2]
      
      #  result_data_dict["state_ppe"] = result[10]
      #  result_data_dict["school_type_txt"] = result[10]
      #  result_data_dict["local_ppe"] = result[16]
       print(result_data_dict)

       results_data_list.append(result_data_dict)

    return jsonify(results_data_list)