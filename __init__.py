from flask import Flask, render_template
from content_management import *
from fuzzywuzzy import fuzz, process
import os
import sys

print (sys.version)

# Import variables from content_management.py
WEEKDAYS = Weekdays()
URL = Get_url()
TIMES_LIST = Get_times_list()
CONTENT_DICT = Get_content_dict()
COURSE_DICT = Get_course_dict()
VENUE_DICT = Get_venue_dict()
ALTERNATE_VENUE_DICT = Get_alternate_venue_dict()
UOE_VENUE_DATA = Get_UOE_venue_data()
ROOM_DICTIONARY = Get_room_dictionary()

app = Flask(__name__)


@app.context_processor
def utility_processor():
    # Returns the name of a venue acronym by looking both into VENUE_DICT and ALTERNATE_VENUE_DICT
    def matchVenue(course_details, venue_dict=VENUE_DICT, alternate_venue_dict=ALTERNATE_VENUE_DICT):
        for key in venue_dict.keys():
            if key in course_details.replace(" ", ""):
                return venue_dict[key]["venue_name"]

        for key in alternate_venue_dict.keys():
            if key in course_details:
                return alternate_venue_dict[key]["venue_name"]

    # Returns the most similar venue name to the argument from the UOE_VENUE_DATA dictionary
    def mostSimilar(venueToMatch, dict=UOE_VENUE_DATA):
        listOfVenues = []
        for item in dict:
            if item.has_key("name"):
                listOfVenues.append(item['name'])
        return process.extractOne(venueToMatch, listOfVenues, scorer=fuzz.token_sort_ratio)[0]

    # Will return all venue acronyms found in details
    def findAllVenues(details, venue_dict=VENUE_DICT, alternate_venue_dict=ALTERNATE_VENUE_DICT):

        concatenatedVenueDict = dict(VENUE_DICT.items() + ALTERNATE_VENUE_DICT.items())
        firstVenueFound = False
        venueList = []

        for key in concatenatedVenueDict.keys():
            noSpaceDetails = details.replace(" ", "")
            if re.search(key, noSpaceDetails):
                venueList.append(key)
        return venueList

    # Will return an array of one or two arrays, each containing the weeks they the course runs in one location
    def getWeekIntervals(details):
        bigIntervalContainer = []
        smallIntervalContainer = []

        weekIntervals = re.findall("[0-9]+\s?[\s&-]\s?[0-9]*", details)

        for weekInterval in weekIntervals:
            if len(weekIntervals) != 1:
                smallIntervalContainer = []
            if re.match("[0-9]+-[0-9]+", weekInterval):
                digitsInWeekInterval = re.findall("[0-9]+", weekInterval)
                for x in range(int(digitsInWeekInterval[0]), int(digitsInWeekInterval[1]) + 1):
                    smallIntervalContainer.append(x)
                bigIntervalContainer.append(smallIntervalContainer)

            elif re.match("[0-9]+\s?&\s?[0-9]+", weekInterval):
                digitsInWeekInterval = re.findall("[0-9]+", weekInterval)
                for x in digitsInWeekInterval:
                    smallIntervalContainer.append(int(x))
                bigIntervalContainer.append(smallIntervalContainer)
            elif re.match("[0-9]+", weekInterval):
                digit = int(re.findall("[0-9]+", weekInterval)[0])
                smallIntervalContainer.append(int(digit))
                bigIntervalContainer.append(smallIntervalContainer)
        return bigIntervalContainer

    # Will return long and lat given a venue name
    def matchNameInJsonToLongLat(name, dict=UOE_VENUE_DATA):
        itemInDict = {}

        for item in dict:
            if item.has_key('name') and item['name'] == name:
                itemInDict = item

        if itemInDict.has_key('longitude') and itemInDict.has_key('latitude'):
            return [float(itemInDict['longitude']), float(itemInDict['latitude'])]

    # Will return the entire subdictionary from UOE_VENUE_DATA given a venue name
    def matchNameInJsonToDict(name, dict=UOE_VENUE_DATA):
        itemInDict = {}

        for item in dict:
            if item.has_key('name') and item['name'] == name:
                itemInDict = item

        return itemInDict

    # Will return the full name of a room if its acronym exists as a key in ROOM_DICTIONARY. Otherwise, it will return the argument.
    def matchRoom(room, roomDictionary=ROOM_DICTIONARY):
        if room in roomDictionary.keys():
            return roomDictionary[room]
        else:
            return room

    # This statement will pass functions onto index.html
    return dict(matchVenue=matchVenue,
                mostSimilar=mostSimilar,
                matchNameInJsonToLongLat=matchNameInJsonToLongLat,
                matchNameInJsonToDict=matchNameInJsonToDict,
                matchRoom=matchRoom,
                findAllVenues=findAllVenues,
                getWeekIntervals=getWeekIntervals)


@app.route('/')
# This statement will pass variables onto intex.html
def homepage():
    return render_template("index.html",
                           WEEKDAYS=WEEKDAYS,
                           TIMES_LIST=TIMES_LIST,
                           COURSE_DICT=COURSE_DICT,
                           CONTENT_DICT=CONTENT_DICT,
                           VENUE_DICT=VENUE_DICT,
                           ALTERNATE_VENUE_DICT=ALTERNATE_VENUE_DICT,
                           UOE_VENUE_DATA=UOE_VENUE_DATA,
                           ROOM_DICTIONARY=ROOM_DICTIONARY)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
