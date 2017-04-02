import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from random import randint
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class PythonOrgSearch(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_use_case_1(self):
        driver = self.driver

        # (1) open the webpage
        driver.get("http://127.0.0.1:5000/")
        allCourses = driver.find_elements_by_class_name("course-box")

        # (2) uncheck all years
        driver.find_element_by_id("checkallyearslabel").click()

        # (3) check year 3
        driver.find_element_by_id("year3").click()

        # (4) check year 4
        driver.find_element_by_id("year4").click()



        # Assert all visible courses are either year 3 or year 4
        for course in allCourses:
            if course.is_displayed():
                assert "year3" in course.get_attribute("class") or "year4" in course.get_attribute("class")

    def test_use_case_2(self):
        driver = self.driver

        # (1) open the webpage
        driver.get("http://127.0.0.1:5000/")
        courses = driver.find_elements_by_class_name("course-box")
        pins = driver.find_elements_by_class_name("pin")
        random_number1 = randint(0, 10)
        random_number2 = randint(0, 10)

        # make sure second random number is not the same as the first random number
        while random_number2 == random_number1:
            random_number2 = randint(0, 10)

        random_course1 = courses[random_number1]
        pin1 = random_course1.find_element_by_xpath(".//i[contains(@class, 'pin')]")

        # (2) hover over first course
        hover1 = ActionChains(driver).move_to_element(pin1)
        hover1.perform()

        # (3) click on the first course's pin
        pin1.click()

        random_course2 = courses[random_number2]
        pin2 = random_course2.find_element_by_xpath(".//i[contains(@class, 'pin')]")

        # (4) hover over second course
        hover2 = ActionChains(driver).move_to_element(pin2)
        hover2.perform()

        # (5) click on the second course's pin
        pin2.click()

        # (6) click on the "Show pinned courses button"
        pinnedcourses = driver.find_element_by_id("showPinnedCoursesButton")
        pinnedcourses.click()

        random_course_acr1 = random_course1.get_attribute("acr")
        random_course_acr2 = random_course2.get_attribute("acr")

        allCourses = driver.find_elements_by_class_name("course-box")

        # Assert all visible courses have the same acronym as the courses
        for course in allCourses:
            if course.is_displayed():
                assert random_course_acr1 in course.get_attribute("acr") or random_course_acr2 in course.get_attribute(
                    "acr")

    # def test_use_case_3(self):
    #     driver = self.driver
    #
    #     # (1) open the webpage
    #     driver.get("http://127.0.0.1:5000/")
    #
    #     random_number = randint(1, 10)
    #     courses = driver.find_elements_by_class_name("course-box")
    #     random_course = courses[random_number]
    #
    #     # (2) click on a course
    #     random_course.click()
    #
    #     mapinstance = driver.find_element_by_class_name("map")
    #     builder = ActionChains(driver)
    #
    #     # (3, 4) find a location on the map and click it
    #     builder.move_to_element_with_offset(mapinstance, 30, 30).click(mapinstance).perform()
    #
    #
    #     walkingdirections = WebDriverWait(driver, 10).until(
    #         EC.presence_of_element_located(driver.find_element_by_xpath("//@label[@for='mapbox-directions-profile-walking']"))
    #     )
    #
    #     # (5) select you wish to view walking directions by clicking on "walking"
    #     walkingdirections.click()
    #
    #     assert "km" in driver.page_source and "min" in driver.page_source

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
