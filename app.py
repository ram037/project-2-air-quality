import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import desc
from sqlalchemy import asc

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
ozone_data = Base.classes.ozone_bycounty
aqi_data = Base.classes.aqi_bycounty

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("website.html")

@app.route("/ozone_data/<fips>")
def get_by_fips_ozone(fips, ozone_data = ozone_data):
    sel = [
        ozone_data.fips,
        ozone_data.arithmetic_mean,
        ozone_data.state_county,
        ozone_data.year,
    ]

    results = db.session.query(*sel).filter(ozone_data.fips == fips).all()

    # Create a dictionary entry for each row of metadata information
    ozone_data = {}
    for result in results:
        ozone_data["fips"] = result[0]
        ozone_data["arithmetic_mean"] = result[1]
        ozone_data['state_county'] = result[2]
        ozone_data['year'] = result[3]

    return jsonify(ozone_data)
    

@app.route("/ozone_data/all")
def all_ozone(ozone_data = ozone_data):
    sel = [
        ozone_data.fips,
        ozone_data.arithmetic_mean,
        ozone_data.state_county,
        ozone_data.year,
        ozone_data.state
    ]

    results = db.session.query(*sel).all()

    ozone_data = []
    for result in results:
        newEntry = {
            "fips": result[0],
            "arithmetic_mean": result[1],
            "state_county": result[2],
            "year": result[3],
            "state": result[4]
        }
        ozone_data.append(newEntry)

    return jsonify(ozone_data)

@app.route("/ozone_state/<state>/<year>")
def get_by_state_ozone(state, year, ozone_data = ozone_data):
    """Return a list of ozone data by state, county, and year."""
    """Return the MetaData for a given sample."""
    
    sel = [
        ozone_data.state,
        ozone_data.county,
        ozone_data.year,
        ozone_data.arithmetic_mean
    ]

    results = db.session.query(*sel).filter(ozone_data.state == state.title()).filter(ozone_data.year == year).group_by(ozone_data.fips).all()

    # Create a dictionary entry for each row of metadata information
    ozone_data = []
    for result in results:
        ozone_data.append({
            "state": result[0],
            "county": result[1],
            "year": result[2],
            "arithmetic_mean": result[3]
        })
    return jsonify(ozone_data)

@app.route("/aqi_data/fips/<fips>")
def get_by_fips_aqi(fips, aqi_data = aqi_data):
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
        aqi_data.good_percentage,
        aqi_data.moderate_percentage,
        aqi_data.unhealthy_sensitive_percentage,
        aqi_data.unhealthy_percentage,
        aqi_data.very_unhealthy_percentage,
        aqi_data.hazardous_percentage,
        aqi_data.id
    ]

    results = db.session.query(*sel).filter(aqi_data.fips == fips).all()

    # Create a dictionary entry for each row of metadata information
    aqi_data = {}
    for result in results:
        aqi_data["state"] = result[0]
        aqi_data["county"] = result[1]
        aqi_data["year"] = result[2]
        aqi_data["days_with_aqi"] = result[3]
        aqi_data["good_days"] = result[4]
        aqi_data["moderate_days"] = result[5]
        aqi_data["unhealthy_sensitive_days"] = result[6]
        aqi_data["unhealthy_days"] = result[7]
        aqi_data["very_unhealthy_days"] = result[8]
        aqi_data["hazardous_days"] = result[9]
        aqi_data["max_aqi"] = result[10]
        aqi_data["median_aqi"] = result[11]
        aqi_data["state_county"] = result[12]
        aqi_data["fips"] = result[13]
        aqi_data["good_percentage"] = result[14]
        aqi_data["moderate_percentage"] = result[15]
        aqi_data["unhealthy_sensitive_percentage"] = result[16]
        aqi_data["unhealthy_percentage"] = result[17]
        aqi_data["very_unhealthy_percentage"] = result[18]
        aqi_data["hazardous_percentage"] = result[19]
        aqi_data["id"] = result[20]


    return jsonify(aqi_data)


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
        aqi_data.state_abbr,
        aqi_data.fips,
        aqi_data.good_percentage,
        aqi_data.moderate_percentage,
        aqi_data.unhealthy_sensitive_percentage,
        aqi_data.unhealthy_percentage,
        aqi_data.very_unhealthy_percentage,
        aqi_data.hazardous_percentage,
        aqi_data.id
    ]

    # results = db.session.query(*sel).all()
    results = db.session.query(*sel).order_by(asc(aqi_data.good_percentage)).all()

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
            "state_abbr": result[13],
            "fips": result[14],
            "good_percentage": result[15],
            "moderate_percentage": result[16],
            "unhealthy_sensitive_percentage": result[17],
            "unhealthy_percentage": result[18],
            "very_unhealthy_percentage": result[19],
            "hazardous_percentage": result[20],
            "id":result[21]
        }
        aqi_data.append(newEntry)

    return jsonify(aqi_data)


@app.route("/aqi_data/year/<year>")
def year_aqi(year, aqi_data = aqi_data):
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
        aqi_data.state_abbr,
        aqi_data.fips,
        aqi_data.good_percentage,
        aqi_data.moderate_percentage,
        aqi_data.unhealthy_sensitive_percentage,
        aqi_data.unhealthy_percentage,
        aqi_data.very_unhealthy_percentage,
        aqi_data.hazardous_percentage,
        aqi_data.id
    ]

    # results = db.session.query(*sel).all()
    results = db.session.query(*sel).filter(aqi_data.year == year).order_by(asc(aqi_data.good_percentage)).all()


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
            "state_abbr": result[13],
            "fips": result[14],
            "good_percentage": result[15],
            "moderate_percentage": result[16],
            "unhealthy_sensitive_percentage": result[17],
            "unhealthy_percentage": result[18],
            "very_unhealthy_percentage": result[19],
            "hazardous_percentage": result[20],
            "id":result[21]
        }
        aqi_data.append(newEntry)

    return jsonify(aqi_data)

@app.route("/aqi_data/state/<state_abbr>")
def all_aqi_bystate(state_abbr, aqi_data = aqi_data):
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
        aqi_data.state_abbr,
        aqi_data.fips,
        aqi_data.good_percentage,
        aqi_data.moderate_percentage,
        aqi_data.unhealthy_sensitive_percentage,
        aqi_data.unhealthy_percentage,
        aqi_data.very_unhealthy_percentage,
        aqi_data.hazardous_percentage,
        aqi_data.id
    ]

    # results = db.session.query(*sel).all()
    results = db.session.query(*sel).filter(aqi_data.state_abbr == state_abbr).all()

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
            "state_abbr": result[13],
            "fips": result[14],
            "good_percentage": result[15],
            "moderate_percentage": result[16],
            "unhealthy_sensitive_percentage": result[17],
            "unhealthy_percentage": result[18],
            "very_unhealthy_percentage": result[19],
            "hazardous_percentage": result[20],
            "id":result[21]
        }
        aqi_data.append(newEntry)

    return jsonify(aqi_data)


if __name__ == "__main__":
    app.run(debug=True)