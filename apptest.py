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
print("base.classes.keys: " )
print(Base.classes.keys())
# Save references to each table
ozone_data = Base.classes.old_table
print(ozone_data)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index_test.html")


@app.route("/ozone_data/<id>")
def get_by_id(id, ozone_data = ozone_data):
    """Return a list of sample names."""
    """Return the MetaData for a given sample."""
    sel = [
        ozone_data.id,
        ozone_data.arithmetic_mean
    ]

    results = db.session.query(*sel).filter(ozone_data.id == id).all()

    # Create a dictionary entry for each row of metadata information
    ozone_data = {}
    for result in results:
        ozone_data["id"] = result[0]
        ozone_data["arithmetic_mean"] = result[1]

    return jsonify(ozone_data)
    

@app.route("/ozone_data/all")
def all(ozone_data = ozone_data):
    """Return a list of sample names."""
    """Return the MetaData for a given sample."""
    sel = [
        ozone_data.id,
        ozone_data.arithmetic_mean
    ]

    results = db.session.query(*sel).all()

    ozone_data = []
    for result in results:
        newEntry = {
            "id": result[0],
            "arithmetic_mean": result[1]
        }
        ozone_data.append(newEntry)

    return jsonify(ozone_data)
    
if __name__ == "__main__":
    app.run(debug=True)