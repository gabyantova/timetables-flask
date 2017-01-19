from bs4 import BeautifulSoup
import urllib
import datetime

def Content():
    TOPIC_DICT = {"Basics":[["Introduction to Python","/introduction-to-python-programming/"],
                            ["Print functions and Strings","/python-tutorial-print-function-strings/"],
                            ["Math basics with Python 3","/math-basics-python-3-beginner-tutorial/"]],
                  "Web Dev":[]}

    return TOPIC_DICT

def Weekdays():
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]


def Get_url():
    now = datetime.datetime.now()
    if now.month < 8:
        ac_year_start = now.year%100 - 1
    else:
        ac_year_start = now.year%100
    return "http://web.inf.ed.ac.uk/infweb/student-services/ito/admin/timetables/lecture-timetable-20" + str(ac_year_start) + "-" + str(ac_year_start + 1)



def Get_course_dict():
    COURSE_DICT = {}
    url_course = "http://course.inf.ed.ac.uk/"
    soup_course = BeautifulSoup(urllib.urlopen(url_course).read())
    course_table = soup_course.table.tbody.find_all("tr")

    for row in course_table:
        cols = row.find_all("td")
        col_list = []
        url = cols[0].find("a").get("href")
        for col in cols:
          col_list.append(col.text)
        COURSE_DICT[(col_list[2]).strip()] = {"course":col_list[0], "year":col_list[9], "credits":col_list[8], "course_url":url}

    return COURSE_DICT

def Get_content_dict():
    content_dict = {}

    soup = BeautifulSoup(urllib.urlopen(Get_url()).read())
    contents = soup.table.tbody.find_all("tr")

    for content in contents:
        row_items = content.find_all("td")
        first = True
        day_of_the_week = ""
        counter = 0
        for row_item in row_items:
            if first:
                content_dict[row_item.text] = []
                day_of_the_week = row_item.text
                first = False
            else: 
                courses_that_hour = row_item.find_all("strong")
                acronymns_of_courses_that_hour = []
                for course_that_hour in courses_that_hour:
                    course_acr = (course_that_hour.text).strip() #remove whitespaces
                    acronymns_of_courses_that_hour.append(course_acr)
                content_dict[day_of_the_week].append(acronymns_of_courses_that_hour)

    return content_dict
