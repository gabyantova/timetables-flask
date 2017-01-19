from flask import Flask, render_template
from content_management import *

from bs4 import BeautifulSoup
import urllib
import datetime

TOPIC_DICT = Content()
WEEKDAYS = Weekdays()
URL = Get_url()
COURSE_DICT = Get_course_dict()
CONTENT_DICT = Get_content_dict()


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

@app.route('/')
def homepage():
    return render_template("index.html", TOPIC_DICT = TOPIC_DICT, WEEKDAYS = WEEKDAYS, TIMES_LIST = TIMES_LIST,
    COURSE_DICT = COURSE_DICT, CONTENT_DICT = CONTENT_DICT)


if __name__ == "__main__":
    app.run()
