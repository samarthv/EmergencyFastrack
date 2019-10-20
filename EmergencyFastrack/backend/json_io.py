from flask import Flask
import googlemaps
import pandas as pd
import numpy as np
from datetime import datetime
import json

app = Flask(__name__)

@app.route("/output")
def output():

	return "Emergency Fastrack"


	@app.route('/receiver', methods = ['POST'])
def worker(latitude, longitude):
	# read json + reply
	data = request.get_json()["data"]

	data_parsed = json.loads(data)

	#Read in tables 
	cities = pd.read_csv(cities.csv)
	counties = pd.read_csv(counties.csv)

	#Google Maps API Key
	API_Key = "AIzaSyAcnohmySzY0Me649IBXFQok6W-VzLJUDM"

	#Initialize Google Maps API client
	gmaps = googlemaps.Client(key=API_Key)

	#Locate and parse from JSON
	coords = gmaps.geolocate()
	coords_parsed = json.loads(location)

	#Extract longitude and latitude
	lat = coords_parsed["location"]["lat"]
	lng = coords_parsed["location"]["lng"]

	#Use longitude and latitude to reverse geocode, parse from JSON
	location = gmaps.reverse_geocode((lat, lng))
	location_parsed = json.loads(location)

	#Extract city and county
	city = location_parsed["address_components"]["locality"]["long_name"]
	county = location_parsed["address_components"]["administrative_area_level_2"]["long_name"][:-7]
	which_emergency = "Fire"

	#If the city is in our table, query the number for that emergency in that city
	if city is in cities["City"]:
		num_to_call = cities.query("City == @city")[which_emergency]
		#If table entry is blank, use 911
		if not num_to_call:
			num_to_call = "911"
	#If the citty is not in our table, query the county number
	elif county is in county:
		num_to_call = cities.query("County == @county")[which_emergency]
		#If the table entry is blank, use 911
		if not num_to_call:
			num_to_call = "911"
	#If neither city nor county are in our table, use 911
	else:
		num_to_call = "911"

	return str(num_to_call)

if __name__ == "__main__":
	app.run()