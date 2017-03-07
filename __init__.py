from flask import Flask, render_template
from content_management import *

from bs4 import BeautifulSoup
import urllib
import datetime
from difflib import SequenceMatcher

WEEKDAYS = Weekdays()
URL = Get_url()
COURSE_DICT = Get_course_dict()
CONTENT_DICT = Get_content_dict()
VENUE_DICT = Get_venue_dict()
ALTERNATE_VENUE_DICT = Get_alternate_venue_dict()
UOE_VENUE_DATA = Get_UOE_venue_data()
ROOM_DICTIONARY = Get_room_dictionary()


print VENUE_DICT
soup = BeautifulSoup(urllib.urlopen(URL).read())
times = soup.table.thead.tr.find_all("th")

times = soup.table.thead.tr.find_all("th")
times = times[1:]
TIMES_LIST = []
for time in times:
    start_time = time.text[0:4]
    end_time = time.text[-4:]
    TIMES_LIST.append(start_time + " - " + end_time)


contents = soup.table.tbody.find_all("tr")

app = Flask(__name__)

@app.context_processor
def utility_processor():
    def getVenueAcrFromDetails(course_details, venue_dict = VENUE_DICT):
        course_details_split = course_details.split(",")

        course_acr = ""

        for item in course_details_split:
            item_no_spaces = item.replace(" ", "")
            for key in venue_dict.keys():

                if key in item_no_spaces:
                    return key

    def matchVenue(course_details, venue_dict=VENUE_DICT, alternate_venue_dict=ALTERNATE_VENUE_DICT):

        course_details_split = course_details.split(",")

        course_acr = ""

        for item in course_details_split:
            #item_no_spaces = item.replace(" ", "")
            for key in venue_dict.keys():
                if key in item.replace(" ", ""):
                    return venue_dict[key]["venue_name"]

        for item in course_details_split:
            #item_no_spaces = item.replace(" ", "")
            for key in alternate_venue_dict.keys():
                if key in item: #.replace(" ", ""):
                    return alternate_venue_dict[key]["venue_name"]


    def addressToUrl(address):
        if address:
            addressList = address.split(" ")
            urlAddress = ""
            for word in addressList:
                urlAddress += word + "%20"
            return urlAddress

    def similar(a, b):
        return SequenceMatcher(None, a, b).ratio()


    def mostSimilar(dict, stringToMatch):

        mostSimilarString = ""
        for item in dict:
            if item.has_key('name') and stringToMatch:
                if similar(item['name'], stringToMatch) > similar(mostSimilarString, stringToMatch):
                    mostSimilarString = item['name']

        return mostSimilarString

    def matchNameInJsonToLongLat(dict, name):

        itemInDict = {}

        for item in dict:
            if item.has_key('name') and item['name'] == name:
                itemInDict = item

        if itemInDict.has_key('longitude') and itemInDict.has_key('latitude'):
            return [float(itemInDict['longitude']), float(itemInDict['latitude'])]

    def matchNameInJsonToDict(dict, name):
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
    # def Get_venue_address(venue_acr, venue_dict=VENUE_DICT):
    #     venue_url = venue_dict[venue_acr]["venue_url"]
    #     if venue_url:
    #         soup_venue = BeautifulSoup(urllib.urlopen(venue_url).read())
    #         if soup_venue:
    #             venue_address = soup_venue.find("div", {"id": "infobox"}).find("info").text
    #             return venue_address
    #     return ""
    # def Get_venue_address(venue_acr, venue_dict):
    #     print(venue_dict)
    #     venue_url = venue_dict[venue_acr]["venue_url"]
    #     soup_venue = BeautifulSoup(urllib.urlopen(venue_url).read())
    #     venue_address = soup_venue.find("div", {"id": "infobox"}).find("info").text
    #     return venue_address

    return dict(matchVenue=matchVenue,
                getVenueAcrFromDetails=getVenueAcrFromDetails,
                addressToUrl=addressToUrl,
                similar=similar,
                mostSimilar=mostSimilar,
                matchNameInJsonToLongLat=matchNameInJsonToLongLat,
                matchNameInJsonToDict=matchNameInJsonToDict,
                matchRoom=matchRoom)#, Get_venue_address=Get_venue_address)




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
