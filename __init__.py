from flask import Flask, render_template
from content_management import *
from fuzzywuzzy import fuzz, process

import sys
print (sys.version)

WEEKDAYS = Weekdays()
URL = Get_url()
COURSE_DICT = Get_course_dict()
CONTENT_DICT = Get_content_dict()
VENUE_DICT = Get_venue_dict()
ALTERNATE_VENUE_DICT = Get_alternate_venue_dict()
UOE_VENUE_DATA = Get_UOE_venue_data()
ROOM_DICTIONARY = Get_room_dictionary()
TIMES_LIST = Get_times_list()

app = Flask(__name__)

@app.context_processor
def utility_processor():

    def matchVenue(course_details, venue_dict=VENUE_DICT, alternate_venue_dict=ALTERNATE_VENUE_DICT):

        #if re.search("(wks|wk)", course_details, re.IGNORECASE):


        for key in venue_dict.keys():
            if key in course_details.replace(" ", ""):
                return venue_dict[key]["venue_name"]

        for key in alternate_venue_dict.keys():
            if key in course_details:
                return alternate_venue_dict[key]["venue_name"]

    def mostSimilar(venueToMatch, dict=UOE_VENUE_DATA):
        listOfVenues = []
        for item in dict:
            if item.has_key("name"):
                listOfVenues.append(item['name'])
        return process.extractOne(venueToMatch, listOfVenues, scorer=fuzz.token_sort_ratio)[0]

    def matchNameInJsonToLongLat(name, dict=UOE_VENUE_DATA):
        itemInDict = {}

        for item in dict:
            if item.has_key('name') and item['name'] == name:
                itemInDict = item

        if itemInDict.has_key('longitude') and itemInDict.has_key('latitude'):
            return [float(itemInDict['longitude']), float(itemInDict['latitude'])]

    def matchNameInJsonToDict(name, dict=UOE_VENUE_DATA):
        itemInDict = {}

        for item in dict:
            if item.has_key('name') and item['name'] == name:
                itemInDict = item

        return itemInDict

    def matchRoom(room, roomDictionary=ROOM_DICTIONARY):
        if room in roomDictionary.keys():
            return roomDictionary[room]
        else:
            return room

    return dict(matchVenue=matchVenue,
                mostSimilar=mostSimilar,
                matchNameInJsonToLongLat=matchNameInJsonToLongLat,
                matchNameInJsonToDict=matchNameInJsonToDict,
                matchRoom=matchRoom)




@app.route('/')
def homepage():
    return render_template("index.html",
    WEEKDAYS = WEEKDAYS,
    TIMES_LIST = TIMES_LIST,
    COURSE_DICT = COURSE_DICT,
    CONTENT_DICT = CONTENT_DICT,
    VENUE_DICT = VENUE_DICT,
    ALTERNATE_VENUE_DICT = ALTERNATE_VENUE_DICT,
    UOE_VENUE_DATA = UOE_VENUE_DATA,
    ROOM_DICTIONARY = ROOM_DICTIONARY)


if __name__ == "__main__":
    app.run()
