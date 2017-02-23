from bs4 import BeautifulSoup
import urllib
import datetime
import re
import ast


def myFunc():
    return ("HELLO BITCHES!!!!")


def Weekdays():
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]


def Get_url():
    now = datetime.datetime.now()
    if now.month < 8:
        ac_year_start = now.year % 100 - 1
    else:
        ac_year_start = now.year % 100
    return "http://web.inf.ed.ac.uk/infweb/student-services/ito/admin/timetables/lecture-timetable-20" + str(
        ac_year_start) + "-" + str(ac_year_start + 1)


def Get_course_dict():
    COURSE_DICT = {}
    url_course = "http://course.inf.ed.ac.uk/"
    soup_course = BeautifulSoup(urllib.urlopen(url_course).read())
    course_table = soup_course.table.tbody.find_all("tr")

    for row in course_table:
        cols = row.find_all("td")
        col_list = []
        url = cols[0].find("a").get("href")
        drps = cols[1].find("a").get("href")
        for col in cols:
            col_list.append(col.text)
        course_type = []
        for x in range(3, 7):
            if col_list[x]:
                course_type.append(col_list[x])

        COURSE_DICT[(col_list[2]).strip()] = {"course": col_list[0],
                                              "year": col_list[9],
                                              "credits": col_list[8],
                                              "course_url": url,
                                              "types": course_type,
                                              "drps": drps,
                                              "level": col_list[7]}

    def pretty(d, indent=0):
        for key, value in d.iteritems():
            print '\t' * indent + str(key)
            if isinstance(value, dict):
                pretty(value, indent + 1)
            else:
                print '\t' * (indent + 1) + str(value)

    print pretty(COURSE_DICT)

    return COURSE_DICT


def Get_venue_dict():
    VENUE_DICT = {}
    url_venue = "http://web.inf.ed.ac.uk/infweb/student-services/ito/admin/venue-codes"
    soup_venue = BeautifulSoup(urllib.urlopen(url_venue).read())
    # course_table = soup_venue.table.tbody.find_all("tr")

    building_and_room_codes = soup_venue.find("section", {"id": "block-system-main"}).find_all("ul")

    building_codes = building_and_room_codes[0].find_all("li")
    # room_codes = building_and_room_codes[1].find_all("li")


    for building_code in building_codes:
        VENUE_DICT[building_code.find("strong").get_text().replace(" ", "")] = {
            "venue_name": building_code.find("a").get_text(),
            "venue_url": building_code.find("a").get("href")}

    return VENUE_DICT


def Get_UOE_venue_data():
    soup = BeautifulSoup(urllib.urlopen("http://webproxy.is.ed.ac.uk/web-proxy/maps_edweb/data.php"))
    content = soup.body.text
    var_list = content.split(";")
    # var_list[0] = var_list[0].split("=")[1]
    var_list[1] = var_list[1].split("=")[1].strip()
    # mapAreas = ast.literal_eval(var_list[0])

    pointsOfInterest = ast.literal_eval(var_list[1])

    # print pointsOfInterest
    return pointsOfInterest


def Get_content_dict():
    semesters_list = []

    soup = BeautifulSoup(urllib.urlopen(Get_url()).read())
    tables = soup.find_all("table")

    for table in tables:
        semester_dict = {}
        final_array_courses_that_hour = []
        contents = table.tbody.find_all("tr")
        for content in contents:
            row_items = content.find_all("td")
            first = True
            day_of_the_week = ""
            for row_item in row_items:
                if first:
                    semester_dict[row_item.text] = []
                    day_of_the_week = row_item.text
                    first = False
                else:
                    courses_that_hour_p = row_item.find_all("p")
                    courses_that_hour_div = row_item.find_all("div")
                    courses_that_hour = courses_that_hour_p + courses_that_hour_div
                    if not (courses_that_hour):
                        courses_that_hour = [row_item]  # .find_all("td")
                    final_array_courses_that_hour = []
                    for course_that_hour in courses_that_hour:
                        if re.search("\[[0-9]\]", course_that_hour.text):
                            array_course_that_hour = []
                            dict_course_that_hour = {}
                            first_split = course_that_hour.text.split("[", 1)  # split on first square bracket
                            second_split = first_split[1].split("]", 1)
                            room = second_split[1].split(",")[0].strip()
                            array_course_that_hour.append(first_split[0])
                            array_course_that_hour.extend(second_split)
                            dict_course_that_hour = {'course_acr': array_course_that_hour[0].strip(),
                                                     'course_year': array_course_that_hour[1].strip(),
                                                     'course_details': array_course_that_hour[2],
                                                     'course_room': room}
                            final_array_courses_that_hour.append(dict_course_that_hour)
                    semester_dict[day_of_the_week].append(final_array_courses_that_hour)

        semesters_list.append(semester_dict)
    # print semesters_list[1]
    return semesters_list
