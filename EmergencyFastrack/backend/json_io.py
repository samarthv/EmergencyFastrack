from flask import Flask, request
import googlemaps
import pandas as pd
import numpy as np
from datetime import datetime
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/output")
def output():

	return "Emergency Fastrack"


@app.route('/receiver', methods = ['POST', 'GET'])
def worker():
	# read json + reply
	# data = request.get_json()["data"]
	#
	# data_parsed = json.loads(data)
	latitude = request.args.get('latitude')
	longitude = request.args.get('longitude')

	#Read in tables
	cities = pd.read_csv('cities.csv')
	counties = pd.read_csv('counties.csv')

	#Google Maps API Key
	API_Key = "[redacted]"

	#Initialize Google Maps API client
	gmaps = googlemaps.Client(key=API_Key)

	#Locate and parse from JSON
	# coords = gmaps.geolocate()
	# coords_parsed = json.loads(location)

	#Extract longitude and latitude
	lat = float(latitude)
	lng = float(longitude)
	#Use longitude and latitude to reverse geocode, parse from JSON
	location = gmaps.reverse_geocode((lat, lng))
	location_parsed = location[0]
	#Extract city and county
	city = "cumst"
	county = "cumst"
	for i in location_parsed["address_components"]:
		if "locality" in i["types"] :
			city = i["long_name"]
		elif "administrative_area_level_2" in i["types"]:
			county = i["long_name"]


	# city = location_parsed["address_components"]["locality"]["long_name"]
	# county = location_parsed["address_components"]["administrative_area_level_2"]["long_name"][:-7]
	which_emergency = "Fire"

	#If the city is in our table, query the number for that emergency in that city
	if city in cities["City"].unique():

		num_to_call = int(cities.query("City == @city")[which_emergency].values[0])
		#If table entry is blank, use 911
		if not num_to_call:
			num_to_call = "911"
	#If the city is not in our table, query the county number
	elif county in counties["County"].unique():
		num_to_call = int(cities.query("County == @county")[which_emergency].values[0])
		#If the table entry is blank, use 911
		if not num_to_call:
			num_to_call = "911"
	#If neither city nor county are in our table, use 911
	else:
		num_to_call = "911"

	return_dict = {"phoneNumber" : str(num_to_call)}

	return json.dumps(return_dict)

if __name__ == "__main__":
	app.run()
