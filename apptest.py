import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/air_quality_db.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
# Save references to each table
ozone_data = Base.classes.old_table
aqi_data = Base.classes.aqi_bycounty

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index_test.html")


@app.route("/ozone_data/<fips>")
def get_by_id(id, ozone_data = ozone_data):
    """Return a list of sample names."""
    """Return the MetaData for a given sample."""
    sel = [
        ozone_data.fips,
        ozone_data.arithmetic_mean
    ]

    results = db.session.query(*sel).filter(ozone_data.fips == fips).all()

    # Create a dictionary entry for each row of metadata information
    ozone_data = {}
    for result in results:
        ozone_data["fips"] = result[0]
        ozone_data["arithmetic_mean"] = result[1]

    return jsonify(ozone_data)
    

@app.route("/ozone_data/all")
def all_ozone(ozone_data = ozone_data):
    """Return a list of sample names."""
    """Return the MetaData for a given sample."""
    sel = [
        ozone_data.fips,
        ozone_data.arithmetic_mean
    ]

    results = db.session.query(*sel).all()

    ozone_data = []
    for result in results:
        newEntry = {
            "fips": result[0],
            "arithmetic_mean": result[1]
        }
        ozone_data.append(newEntry)

    return jsonify(ozone_data)

@app.route("/aqi_data/<fips>")
def get_by_id(id, aqi_data = aqi_data):
    """Return a list of sample names."""
    """Return the MetaData for a given sample."""
    sel = [
        aqi_data.state,
        aqi_data.county,
        aqi_data.year,
        aqi_data.days_with_aqi,
        aqi_data.good_days,
        aqi_data.moderate_days,
        aqi_data.unhealthy_sensitive_days,
        aqi_data.unhealthy_days,
        aqi_data.very_unhealthy_days,
        aqi_data.hazardous_days,
        aqi_data.max_aqi,
        aqi_data.median_aqi,
        aqi_data.state_county,
        aqi_data.fips,
        aqi_data.id
    ]

    results = db.session.query(*sel).filter(aqi_data.fips == fips).all()

    # Create a dictionary entry for each row of metadata information
    ozone_data = {}
    for result in results:
        ozone_data["fips"] = result[0]
        ozone_data["arithmetic_mean"] = result[1]

        aqi_data.state,
        aqi_data.county,
        aqi_data.year,
        aqi_data.days_with_aqi,
        aqi_data.good_days,
        aqi_data.moderate_days,
        aqi_data.unhealthy_sensitive_days,
        aqi_data.unhealthy_days,
        aqi_data.very_unhealthy_days,
        aqi_data.hazardous_days,
        aqi_data.max_aqi,
        aqi_data.median_aqi,
        aqi_data.state_county,
        aqi_data.fips,
        aqi_data.id



    return jsonify(ozone_data)




@app.route("/aqi_data/all")
def all_aqi(aqi_data = aqi_data):
    """Return a list of sample names."""
    """Return the MetaData for a given sample."""
    sel = [
        aqi_data.state,
        aqi_data.county,
        aqi_data.year,
        aqi_data.days_with_aqi,
        aqi_data.good_days,
        aqi_data.moderate_days,
        aqi_data.unhealthy_sensitive_days,
        aqi_data.unhealthy_days,
        aqi_data.very_unhealthy_days,
        aqi_data.hazardous_days,
        aqi_data.max_aqi,
        aqi_data.median_aqi,
        aqi_data.state_county,
        aqi_data.fips,
        aqi_data.id
    ]

    results = db.session.query(*sel).all()

    aqi_data = []
    for result in results:
        newEntry = {
            "state": result[0],
            "county": result[1],
            "year": result[2],
            "days_with_aqi": result[3],
            "good_days": result[4],
            "moderate_days": result[5],
            "unhealthy_sensitive_days": result[6],
            "unhealthy_days": result[7],
            "very_unhealthy_days": result[8],
            "hazardous_days": result[9],
            "max_aqi": result[10],
            "median_aqi": result[11],
            "state_county": result[12],
            "fips":result[13],
            "id":result[14]
        }
        aqi_data.append(newEntry)

    return jsonify(aqi_data)




if __name__ == "__main__":
    app.run(debug=True)